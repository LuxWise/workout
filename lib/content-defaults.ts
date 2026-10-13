import type { SiteContent } from "./types";

/** Textos originales de la página. `{dias}` y `{n}` se reemplazan por los días y el número de sesiones de fuerza. */
export const defaultContent: SiteContent = {
    header: {
        eyebrow: "Programa de recomposición · 4–5 sesiones / semana",
        title: "Bitácora de Hierro",
        intro:
            "Torso/Pierna a doble frecuencia, pensado para tu calendario real: trabajo, universidad y sesiones de 60–90 min. El objetivo no es la báscula — es convertir el peso ganado en músculo.",
    },
    adaptation: {
        label: "Primeros 2 meses — fase de adaptación (RPE 6–7, 1 serie menos en cada ejercicio principal)",
        body:
            "Esta fase esta propuesta para los primeros 2 meses, para que tus articulaciones y tendones se adapten a la carga de trabajo. No es flojera: tu fuerza volverá rápido, pero tus articulaciones llevan 2 años sin esta carga. Esto evita lesiones y dolor muscular incapacitante en la primera semana.",
    },
    warmup: {
        label: "Calentamiento (antes de cada sesión, ~15 min)",
        steps: [
            "**1 km de cardio suave** (trote o caminata rápida): ritmo en el que puedas hablar, ~8–10 min.",
            "**Movilidad de todo el cuerpo** (~5 min): cuello y hombros, columna (gato-vaca), cadera, rodillas y tobillos, 8–10 repeticiones lentas por movimiento.",
            "**Series de aproximación** del primer ejercicio: 40% → 60% → 80% del peso de trabajo.",
        ],
    },
    weekNote:
        "Con {dias} ya tienes las {n} sesiones de fuerza que necesitas para progresar de verdad. Movilidad y natación suman, pero no rompen nada si se saltan.",
    active: {
        intro:
            "Son los días “activos”: no buscan cansarte, buscan que no te quedes quieto mientras tu cuerpo se recupera de las pesas.",
        mobility: {
            body:
                "Movimiento consciente y suave: caminar, trotar muy ligero o hacer ejercicios de movilidad. Es recuperación activa, no un entrenamiento.",
            bullets: [
                { k: "Duración", v: "30–45 min." },
                { k: "Intensidad", v: "puedes hablar con normalidad todo el rato (RPE 3–4, ritmo conversacional)." },
                { k: "Opciones", v: "caminata rápida, trote suave, movilidad de cadera, hombros y columna." },
                { k: "Para qué", v: "mejora la circulación, reduce la rigidez de las sesiones de fuerza y suma gasto calórico sin fatigar." },
                { k: "Evita", v: "convertirlo en un entrenamiento duro; si terminas agotado, fue demasiado." },
            ],
        },
        pool: {
            body:
                "Una hora de piscina para mejorar el cardio y variar la rutina. Al ser de bajo impacto, descansa rodillas y espalda.",
            bullets: [
                { k: "Duración", v: "~60 min, incluyendo pausas." },
                { k: "Intensidad", v: "moderada (RPE 5–6): nado continuo con descansos de 20–30 s cuando lo necesites." },
                { k: "Estructura sugerida", v: "5–10 min suave, 40 min de largos alternando estilos, 5–10 min suelto." },
                { k: "Para qué", v: "capacidad cardiovascular, movilidad de hombros y recuperación de las piernas." },
                { k: "Ojo", v: "si el hombro molesta tras Torso A, nada más suave o prioriza patada y crol relajado." },
            ],
        },
    },
    rules: {
        adaptationTitle: "Primeros 2 meses — fase de adaptación.",
        adaptationBody:
            'Quita 1 serie de cada ejercicio principal y entrena a RPE 6–7 (dejando 3–4 reps "en el tanque"). Tus tendones y articulaciones necesitan más tiempo que tu fuerza para readaptarse; esto evita lesiones y dolor muscular incapacitante.',
        items: [
            { k: "Intensidad (RPE)", v: "Sem 3+: ejercicio principal (el primero del día) a **RPE 7–9**, accesorios a **RPE 8–9**. Nunca al fallo total en sentadilla, peso muerto o press: deja siempre 1–2 reps en reserva." },
            { k: "Sobrecarga", v: "Cuando completes todas las series en el tope del rango de reps con buena técnica durante 2 sesiones seguidas, sube el peso: **+2.5 kg** en tren superior, **+5 kg** en tren inferior. Sube **una variable a la vez** (peso o reps), no ambas." },
            { k: "Descansos", v: "Respeta el tiempo de descanso de la tabla. Acortarlo para “terminar antes” baja el rendimiento en las series siguientes y el estímulo real. Con 60–90 min por sesión alcanza sin apuro." },
            { k: "Técnica primero", v: "Si la técnica se rompe (espalda redondeada, rodillas hacia adentro, rebote en la barra), baja el peso. Filma una serie de vez en cuando para revisarla. Un ejercicio nuevo se aprende con cargas ligeras." },
            { k: "Deload", v: "Cada 5–6 semanas, una semana con 40% menos volumen y peso más liviano. No es un día perdido: es lo que te permite seguir subiendo carga sin acumular fatiga ni molestias en rodillas u hombros." },
            { k: "Mínimo viable", v: "Tus {n} sesiones de fuerza son {dias}. Si una semana no te alcanza, prioriza Pierna A, Torso A y Pierna B; Movilidad y natación suman, pero no son obligatorias." },
        ],
        limitsTitle: "Límites y precauciones",
        limits: [
            "Dolor punzante, articular o que se agudiza durante la serie: detén el ejercicio y cámbialo por una variante sin dolor. La molestia muscular (agujetas) es normal; el dolor de articulación o tendón no.",
            "Dolor que persiste más de 1 semana, hormigueo, mareo o falta de aire anormal: consulta a un profesional de la salud antes de seguir cargando.",
            "Deja al menos 48 h entre dos sesiones que trabajen el mismo grupo muscular. El programa ya está ordenado para respetarlo.",
            "No entrenes fuerza con fiebre, enfermedad o menos de 5 h de sueño; ese día camina o descansa. Perder una sesión cuesta menos que una lesión.",
            "Máximo 90 min de sesión de fuerza. Más tiempo no da más músculo, solo más fatiga.",
            "No añadas series “extra” ni sesiones por tu cuenta: más volumen no es mejor si no alcanzas a recuperarte.",
            "Calienta siempre (ver Resumen) y toma agua durante la sesión; evita entrenar fuerte justo después de comer.",
        ],
        nutritionTitle: "La recomposición se gana también fuera del gimnasio.",
        nutritionBody:
            "Proteína ≈ 1.8–2.2 g/kg/día (unos 155–190 g repartidos en 3–4 comidas), calorías en mantenimiento o con déficit leve — nunca agresivo, porque un déficit grande frena la ganancia muscular — y 7–8 h de sueño, que es donde realmente se recupera el tejido.",
    },
    footer:
        "Bitácora de Hierro — revisa cada 5–6 semanas y ajusta pesos y reps según tu progreso real, no según el plan en papel.",
};
