import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 días

function secret() {
    const pw = process.env.ADMIN_PASSWORD;
    if (!pw) throw new Error("Falta la variable de entorno ADMIN_PASSWORD");
    return pw;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(`admin-session:${payload}`).digest("hex");

function safeEqual(a: string, b: string) {
    const ha = createHmac("sha256", "cmp").update(a).digest();
    const hb = createHmac("sha256", "cmp").update(b).digest();
    return timingSafeEqual(ha, hb);
}

export const checkPassword = (input: string) => safeEqual(input, secret());

export async function createSession() {
    const exp = Date.now() + MAX_AGE * 1000;
    (await cookies()).set(COOKIE, `${exp}.${sign(String(exp))}`, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/admin",
        maxAge: MAX_AGE,
    });
}

export async function destroySession() {
    (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isAdmin() {
    const value = (await cookies()).get(COOKIE)?.value;
    if (!value) return false;
    const [exp, sig] = value.split(".");
    if (!exp || !sig || Number(exp) < Date.now()) return false;
    return safeEqual(sig, sign(exp));
}

/** Llamar al inicio de cada página y server action del CMS. */
export async function requireAdmin() {
    if (!(await isAdmin())) redirect("/admin/login");
}
