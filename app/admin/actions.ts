"use server";

import { redirect } from "next/navigation";
import type { Document } from "mongodb";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession, requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { runSeed } from "@/lib/seed";
import type { Bullet, Exercise, Routine, SiteContent, TagColor, WeekDay } from "@/lib/types";

export type ActionResult = { ok: true; message?: string; key?: string } | { ok: false; error: string };

const COLORS: TagColor[] = ["ember", "moss", "sky"];
const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const LOCKED_KEYS = ["mobility", "pool"];

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const fail = (error: string): ActionResult => ({ ok: false, error });

function refresh() {
    revalidatePath("/");
    revalidatePath("/admin", "layout");
}

// ---------- Sesión ----------

const failedLogins = new Map<string, { n: number; until: number }>();

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
    const state = failedLogins.get("global") ?? { n: 0, until: 0 };
    if (state.until > Date.now()) return { error: "Demasiados intentos. Espera un minuto." };

    if (!checkPassword(str(formData.get("password"), 200))) {
        const n = state.n + 1;
        failedLogins.set("global", { n, until: n >= 5 ? Date.now() + 60_000 : 0 });
        return { error: "Contraseña incorrecta." };
    }
    failedLogins.delete("global");
    await createSession();
    redirect("/admin");
}

export async function logout() {
    await destroySession();
    redirect("/admin/login");
}

// ---------- Semana ----------

export async function saveWeek(input: WeekDay[]): Promise<ActionResult> {
    await requireAdmin();
    if (!Array.isArray(input) || input.length === 0) return fail("La semana necesita al menos un día.");

    const db = await getDb();
    const keys = new Set((await db.collection<Routine>("routines").find({}, { projection: { key: 1 } }).toArray()).map((r) => r.key));

    const days: WeekDay[] = [];
    for (const [i, d] of input.entries()) {
        const day = str(d.day, 20);
        const routine = str(d.routine, 80);
        if (!DAYS.includes(day)) return fail(`Día inválido en la fila ${i + 1}.`);
        if (!keys.has(routine)) return fail(`La rutina de ${day} ya no existe.`);
        if (!COLORS.includes(d.color)) return fail(`Color inválido en ${day}.`);
        days.push({ order: i, day, slot: str(d.slot, 40), routine, tag: str(d.tag, 60), color: d.color });
    }

    const col = db.collection<WeekDay>("week");
    await col.bulkWrite([
        ...days.map((d) => ({ replaceOne: { filter: { order: d.order }, replacement: d, upsert: true } })),
        { deleteMany: { filter: { order: { $gte: days.length } } } },
    ]);
    refresh();
    return { ok: true, message: "Semana guardada" };
}

// ---------- Rutinas ----------

function cleanExercises(input: unknown): Exercise[] | string {
    if (!Array.isArray(input)) return "Ejercicios inválidos.";
    const out: Exercise[] = [];
    for (const [i, e] of (input as Exercise[]).entries()) {
        const name = str(e?.name, 120);
        if (!name) return `El ejercicio ${i + 1} no tiene nombre.`;
        const ex: Exercise = { name, sets: str(e.sets, 20), reps: str(e.reps, 40), rest: str(e.rest, 40), note: str(e.note, 300) };
        if (e.duration) ex.duration = str(e.duration, 40);
        if (e.intensity) ex.intensity = str(e.intensity, 40);
        out.push(ex);
    }
    return out;
}

const slugify = (s: string) =>
    s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** `key` null crea una rutina nueva; con valor, actualiza esa rutina. */
export async function saveRoutine(key: string | null, input: Routine): Promise<ActionResult> {
    await requireAdmin();
    const name = str(input.name, 60);
    if (!name) return fail("La rutina necesita un nombre.");
    if (!COLORS.includes(input.tagColor)) return fail("Color inválido.");
    const exercises = cleanExercises(input.exercises);
    if (typeof exercises === "string") return fail(exercises);

    const db = await getDb();
    const col = db.collection<Routine>("routines");
    const base = {
        name,
        tagLabel: str(input.tagLabel, 60),
        tagColor: input.tagColor,
        duration: str(input.duration, 40),
        intro: str(input.intro, 600),
        nameHeader: str(input.nameHeader, 30),
        repsHeader: str(input.repsHeader, 30),
        exercises,
    };
    // Los campos opcionales vacíos no se guardan.
    const clean = (r: typeof base) => Object.fromEntries(Object.entries(r).filter(([, v]) => v !== "")) as typeof base;

    if (key === null) {
        const slug = slugify(name);
        if (!slug) return fail("El nombre debe incluir letras o números.");
        if (await col.findOne({ $or: [{ key: slug }, { slug }] })) return fail("Ya existe una rutina con ese nombre.");
        const kind = input.kind === "optional" ? "optional" : "strength";
        await col.insertOne({ key: slug, slug, kind, ...clean(base) });
        refresh();
        return { ok: true, key: slug, message: "Rutina creada" };
    }

    const current = await col.findOne({ key });
    if (!current) return fail("La rutina ya no existe.");
    await col.replaceOne({ key }, { key, slug: current.slug, kind: current.kind, ...clean(base) });
    refresh();
    return { ok: true, key, message: "Rutina guardada" };
}

export async function deleteRoutine(key: string): Promise<ActionResult> {
    await requireAdmin();
    if (LOCKED_KEYS.includes(key)) return fail("Esta rutina alimenta una tarjeta fija de la página y no se puede eliminar.");
    const db = await getDb();
    const used = await db.collection<WeekDay>("week").find({ routine: key }).toArray();
    if (used.length) return fail(`Está asignada a ${used.map((d) => d.day).join(", ")}. Quítala de la semana primero.`);
    await db.collection<Routine>("routines").deleteOne({ key });
    refresh();
    return { ok: true };
}

// ---------- Textos ----------

const bullets = (v: unknown, max = 8): Bullet[] =>
    Array.isArray(v) ? (v as Bullet[]).slice(0, max * 4).map((b) => ({ k: str(b?.k, 80), v: str(b?.v, 600) })).filter((b) => b.k || b.v) : [];
const lines = (v: unknown): string[] => (Array.isArray(v) ? v.map((s) => str(s, 700)).filter(Boolean) : []);

export async function saveContent(c: SiteContent): Promise<ActionResult> {
    await requireAdmin();
    const content: SiteContent = {
        header: { eyebrow: str(c.header?.eyebrow, 120), title: str(c.header?.title, 80), intro: str(c.header?.intro, 700) },
        adaptation: { label: str(c.adaptation?.label, 200), body: str(c.adaptation?.body, 900) },
        warmup: { label: str(c.warmup?.label, 120), steps: lines(c.warmup?.steps) },
        weekNote: str(c.weekNote, 500),
        active: {
            intro: str(c.active?.intro, 500),
            mobility: { body: str(c.active?.mobility?.body, 600), bullets: bullets(c.active?.mobility?.bullets) },
            pool: { body: str(c.active?.pool?.body, 600), bullets: bullets(c.active?.pool?.bullets) },
        },
        rules: {
            adaptationTitle: str(c.rules?.adaptationTitle, 120),
            adaptationBody: str(c.rules?.adaptationBody, 900),
            items: bullets(c.rules?.items, 12),
            limitsTitle: str(c.rules?.limitsTitle, 80),
            limits: lines(c.rules?.limits),
            nutritionTitle: str(c.rules?.nutritionTitle, 160),
            nutritionBody: str(c.rules?.nutritionBody, 900),
        },
        footer: str(c.footer, 400),
    };
    if (!content.header.title) return fail("El título de la página no puede estar vacío.");

    const db = await getDb();
    await db.collection<{ _id: string } & Document>("content").replaceOne({ _id: "site" }, content, { upsert: true });
    refresh();
    return { ok: true, message: "Textos guardados" };
}

// ---------- Ajustes ----------

export async function restoreDefaults(): Promise<ActionResult> {
    await requireAdmin();
    const { routines, days } = await runSeed(await getDb());
    refresh();
    return { ok: true, message: `Restaurado: ${routines} rutinas y ${days} días.` };
}
