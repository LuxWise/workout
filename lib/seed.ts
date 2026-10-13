import type { Db, Document } from "mongodb";
import { legA, legB } from "../app/config/routine/legs";
import { torsoA, torsoB } from "../app/config/routine/torso";
import { opcional } from "../app/config/routine/optional";
import { week } from "../app/config/week";
import { defaultContent } from "./content-defaults";
import type { Routine, WeekDay } from "./types";

export const routines: Routine[] = [
    { key: "legA", name: "Pierna A", kind: "strength", slug: "pierna-a", tagLabel: "Cuádriceps + core", tagColor: "ember", exercises: legA },
    { key: "torsoA", name: "Torso A", kind: "strength", slug: "torso-a", tagLabel: "Empuje + tracción", tagColor: "moss", exercises: torsoA },
    { key: "legB", name: "Pierna B", kind: "strength", slug: "pierna-b", tagLabel: "Cadera/Posterior + core", tagColor: "ember", exercises: legB },
    { key: "torsoB", name: "Torso B", kind: "strength", slug: "torso-b", tagLabel: "Espalda + brazos", tagColor: "moss", exercises: torsoB },
    {
        key: "optional",
        name: "Opcional",
        kind: "optional",
        slug: "opcional",
        tagLabel: "Full body ligero + cardio",
        tagColor: "moss",
        intro: `Este día no suma estrés articular fuerte — es para moverte, trabajar puntos débiles y mejorar tu base cardiovascular, clave para que el "cambio de grasa a músculo" se vea más rápido.`,
        nameHeader: "Bloque",
        repsHeader: "Tiempo",
        exercises: opcional,
    },
    { key: "mobility", name: "Movilidad", kind: "active", slug: "movilidad", tagLabel: "Movilidad", tagColor: "sky", exercises: [] },
    { key: "pool", name: "Piscina", kind: "active", slug: "piscina", tagLabel: "Natación", tagColor: "sky", exercises: [] },
];

// El `session` del week.ts original apunta a la rutina por nombre.
const keyBySession = Object.fromEntries(routines.map((r) => [r.name, r.key]));

export const weekDays: WeekDay[] = week.map((w, i) => {
    const routine = keyBySession[w.session];
    if (!routine) throw new Error(`Sesión sin rutina asociada: ${w.session}`);
    return { order: i, day: w.day, slot: w.slot, routine, tag: w.tag, color: w.color };
});

/** Restaura los datos originales: borra lo existente y vuelve a insertar rutinas, semana y textos. */
export async function runSeed(db: Db) {
    const routinesCol = db.collection<Routine>("routines");
    const weekCol = db.collection<WeekDay>("week");
    const contentCol = db.collection<{ _id: string } & Document>("content");

    await routinesCol.createIndex({ key: 1 }, { unique: true });
    await weekCol.createIndex({ order: 1 }, { unique: true });

    await Promise.all([routinesCol.deleteMany({}), weekCol.deleteMany({})]);
    await routinesCol.insertMany(routines.map((r) => ({ ...r })));
    await weekCol.insertMany(weekDays.map((d) => ({ ...d })));
    await contentCol.replaceOne({ _id: "site" }, defaultContent, { upsert: true });

    return { routines: routines.length, days: weekDays.length };
}
