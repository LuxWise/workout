export type TagColor = "ember" | "moss" | "sky";

export type Exercise = {
    name: string;
    sets: string;
    reps: string;
    rest: string;
    note: string;
    /** Opcional: ejercicios por tiempo o cardio */
    duration?: string;
    intensity?: string;
};

/** Colección `routines`. `key` es el identificador estable (legA, torsoB, optional...). */
export type Routine = {
    key: string;
    name: string;
    /** strength = tabla de fuerza; optional = bloque extra; active = día sin pesas (movilidad, piscina) */
    kind: "strength" | "optional" | "active";
    /** Id HTML de la sección (ancla del nav) */
    slug: string;
    tagLabel: string;
    tagColor: TagColor;
    duration?: string;
    intro?: string;
    nameHeader?: string;
    repsHeader?: string;
    exercises: Exercise[];
};

/** Colección `week`. `routine` referencia a `routines.key`. */
export type WeekDay = {
    order: number;
    day: string;
    slot: string;
    routine: string;
    tag: string;
    color: TagColor;
};

/** Día de la semana ya unido con su rutina. */
export type WeekEntry = WeekDay & { routineDoc: Routine };

export type Bullet = { k: string; v: string };

export type ActiveCard = { body: string; bullets: Bullet[] };

/** Documento único de la colección `content` (_id: "site"). Los textos admiten **negrita**. */
export type SiteContent = {
    header: { eyebrow: string; title: string; intro: string };
    adaptation: { label: string; body: string };
    warmup: { label: string; steps: string[] };
    /** Admite {dias} y {n} (días y cantidad de sesiones de fuerza). */
    weekNote: string;
    active: { intro: string; mobility: ActiveCard; pool: ActiveCard };
    rules: {
        adaptationTitle: string;
        adaptationBody: string;
        items: Bullet[];
        limitsTitle: string;
        limits: string[];
        nutritionTitle: string;
        nutritionBody: string;
    };
    footer: string;
};
