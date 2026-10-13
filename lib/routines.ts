import "server-only";
import type { Document } from "mongodb";
import { connection } from "next/server";
import { getDb } from "./mongodb";
import { defaultContent } from "./content-defaults";
import type { Routine, SiteContent, WeekDay, WeekEntry } from "./types";

export async function getRoutines(): Promise<Routine[]> {
    const db = await getDb();
    return db.collection<Routine>("routines").find({}, { projection: { _id: 0 } }).toArray();
}

export async function getWeekDays(): Promise<WeekDay[]> {
    const db = await getDb();
    return db.collection<WeekDay>("week").find({}, { projection: { _id: 0 } }).sort({ order: 1 }).toArray();
}

/** Si el documento aún no existe (sin sembrar), se usan los textos originales. */
export async function getContent(): Promise<SiteContent> {
    const db = await getDb();
    const doc = await db
        .collection<{ _id: string } & Document>("content")
        .findOne({ _id: "site" }, { projection: { _id: 0 } });
    return doc ? { ...defaultContent, ...(doc as Partial<SiteContent>) } : defaultContent;
}

/** Lee todo en cada request (SSR) y une cada día con su rutina. */
export async function getProgram(): Promise<{ routines: Routine[]; week: WeekEntry[]; content: SiteContent }> {
    await connection();
    const [routines, days, content] = await Promise.all([getRoutines(), getWeekDays(), getContent()]);

    const byKey = new Map(routines.map((r) => [r.key, r]));
    const week = days.flatMap((d) => {
        const routineDoc = byKey.get(d.routine);
        return routineDoc ? [{ ...d, routineDoc }] : [];
    });

    return { routines, week, content };
}
