import { DaySection } from "@/components/day-section";
import { Tag } from "@/components/tag";
import type { ReactNode } from "react";
import { week } from "./config/week";
import { legA, legB } from "./config/routine/legs";
import { torsoA, torsoB } from "./config/routine/torso";
import { opcional } from "./config/routine/optional";

const rules: { k: string; v: ReactNode }[] = [
  { k: "Intensidad (RPE)", v: <>Sem 3+: ejercicio principal (el primero del día) a <b>RPE 7–9</b>, accesorios a <b>RPE 8–9</b>. Nunca al fallo total en sentadilla, peso muerto o press: deja siempre 1–2 reps en reserva.</> },
  { k: "Sobrecarga", v: <>Cuando completes todas las series en el tope del rango de reps con buena técnica durante 2 sesiones seguidas, sube el peso: <b>+2.5 kg</b> en tren superior, <b>+5 kg</b> en tren inferior. Sube <b>una variable a la vez</b> (peso o reps), no ambas.</> },
  { k: "Descansos", v: "Respeta el tiempo de descanso de la tabla. Acortarlo para “terminar antes” baja el rendimiento en las series siguientes y el estímulo real. Con 60–90 min por sesión alcanza sin apuro." },
  { k: "Técnica primero", v: "Si la técnica se rompe (espalda redondeada, rodillas hacia adentro, rebote en la barra), baja el peso. Filma una serie de vez en cuando para revisarla. Un ejercicio nuevo se aprende con cargas ligeras." },
  { k: "Deload", v: "Cada 5–6 semanas, una semana con 40% menos volumen y peso más liviano. No es un día perdido: es lo que te permite seguir subiendo carga sin acumular fatiga ni molestias en rodillas u hombros." },
  { k: "Mínimo viable", v: "Tus 4 sesiones de fuerza son Domingo, Martes, Miércoles y Sábado. Si una semana no te alcanza, prioriza Pierna A, Torso A y Pierna B; Movilidad y natación suman, pero no son obligatorias." },
];

const limits = [
  "Dolor punzante, articular o que se agudiza durante la serie: detén el ejercicio y cámbialo por una variante sin dolor. La molestia muscular (agujetas) es normal; el dolor de articulación o tendón no.",
  "Dolor que persiste más de 1 semana, hormigueo, mareo o falta de aire anormal: consulta a un profesional de la salud antes de seguir cargando.",
  "Deja al menos 48 h entre dos sesiones que trabajen el mismo grupo muscular. El programa ya está ordenado para respetarlo.",
  "No entrenes fuerza con fiebre, enfermedad o menos de 5 h de sueño; ese día camina o descansa. Perder una sesión cuesta menos que una lesión.",
  "Máximo 90 min de sesión de fuerza. Más tiempo no da más músculo, solo más fatiga.",
  "No añadas series “extra” ni sesiones por tu cuenta: más volumen no es mejor si no alcanzas a recuperarte.",
  "Calienta siempre (ver Resumen) y toma agua durante la sesión; evita entrenar fuerte justo después de comer.",
];

const mono = "font-sans";
const display = "font-display";
const cardCls =
  "bg-white dark:bg-[#1B2327] border border-[#D8E2E6] dark:border-[#2C373D] rounded-2xl";
const chipCls =
  `${mono} text-[14.5px] sm:text-[16px] no-underline text-[#1C2A30] dark:text-[#E8EEF0] bg-white dark:bg-[#1B2327] border border-[#D8E2E6] dark:border-[#2C373D] rounded-full px-3.5 py-1.5 whitespace-nowrap hover:border-[#BF4A2A] hover:text-[#BF4A2A] dark:hover:border-[#F0906A] dark:hover:text-[#F0906A]`;

export default function BitacoraDeHierro() {
  return (
    <>

      <div className={`min-h-screen bg-[#F4F7F8] dark:bg-[#12181B] text-[#1C2A30] dark:text-[#E8EEF0] font-sans text-[15px] sm:text-base leading-[1.6]`}>
        <div className="max-w-190 mx-auto px-4 sm:px-5 pt-6 sm:pt-7 pb-15">
          <header className="mb-5">
            <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.09em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
              Programa de recomposición · 4–5 sesiones / semana
            </div>
            <h1 className={`${display} font-semibold text-[clamp(26px,6vw,38px)] tracking-[0.01em] [text:balance] mt-1`}>
              Bitácora de Hierro
            </h1>
            <p className="mt-2 text-[#55656D] dark:text-[#A3B1B8] max-w-[60ch]">
              Torso/Pierna a doble frecuencia, pensado para tu calendario real: trabajo,
              universidad y sesiones de 60–90 min. El objetivo no es la báscula — es
              convertir el peso ganado en músculo.
            </p>
          </header>

          <nav
            aria-label="Ir a sección"
            className="flex flex-wrap gap-2 pt-2.5 pb-5 border-b border-[#D8E2E6] dark:border-[#2C373D] mb-6 sticky top-[env(safe-area-inset-top,0px)] bg-[#F4F7F8] dark:bg-[#12181B] z-10"
          >
            <a href="#resumen" className={chipCls}>Resumen</a>
            <a href="#pierna-a" className={chipCls}>Dom · Pierna A</a>
            <a href="#torso-a" className={chipCls}>Mar · Torso A</a>
            <a href="#pierna-b" className={chipCls}>Mié · Pierna B</a>
            <a href="#torso-b" className={chipCls}>Sáb · Torso B</a>
            <a href="#opcional" className={chipCls}>Opcional</a>
            <a href="#movilidad-natacion" className={chipCls}>Movilidad y natación</a>
            <a href="#reglas" className={chipCls}>Reglas</a>
          </nav>

          <section id="resumen" className="mb-10 scroll-mt-18">
            <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.09em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
              Resumen
            </div>
            <h2 className={`${display} font-semibold text-[clamp(20px,4.5vw,26px)] mt-1.5`}>
              Empecemos
            </h2>

            <div className="flex flex-col gap-3.5 mt-4">
              <div className={`${cardCls} p-4 sm:p-5 flex flex-col gap-1.5`}>
                <span className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.07em] text-[#55656D] dark:text-[#A3B1B8]`}>
                  Primeros 2 meses — fase de adaptación (RPE 6–7, 1 serie menos en cada ejercicio principal)
                </span>
                Esta fase esta propuesta para los primeros 2 meses, para que tus articulaciones y tendones se adapten a la carga de trabajo. No es flojera: tu fuerza volverá rápido, pero tus articulaciones llevan 2 años sin esta carga. Esto evita lesiones y dolor muscular incapacitante en la primera semana.
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-4">
              <div className={`${cardCls} p-4 sm:p-5 flex flex-col gap-1.5`}>
                <span className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.07em] text-[#55656D] dark:text-[#A3B1B8]`}>
                  Calentamiento (antes de cada sesión, ~15 min)
                </span>
                <ol className="list-decimal pl-5 mt-1 space-y-2 text-[14.5px] sm:text-[16px]">
                  <li><b>1 km de cardio suave</b> (trote o caminata rápida): ritmo en el que puedas hablar, ~8–10 min.</li>
                  <li><b>Movilidad de todo el cuerpo</b> (~5 min): cuello y hombros, columna (gato-vaca), cadera, rodillas y tobillos, 8–10 repeticiones lentas por movimiento.</li>
                  <li><b>Series de aproximación</b> del primer ejercicio: 40% → 60% → 80% del peso de trabajo.</li>
                </ol>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-105 border-collapse mt-3.5 text-[14.5px] sm:text-[16px]">
                <caption className={`${mono} text-left text-[11.5px] sm:text-[13px] uppercase tracking-[0.07em] text-[#55656D] dark:text-[#A3B1B8] mb-2`}>
                  Semana a la vista
                </caption>
                <thead>
                  <tr>
                    {["Día", "Franja", "Sesión", "Foco"].map((h) => (
                      <th
                        key={h}
                        className={`${mono} text-left text-[11.5px] sm:text-[13px] uppercase tracking-[0.06em] text-[#55656D] dark:text-[#A3B1B8] font-semibold px-2.5 py-2 border-b border-[#D8E2E6] dark:border-[#2C373D]`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {week.map((row, i) => (
                    <tr key={row.day}>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                        {row.day}
                      </td>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                        {row.slot}
                      </td>
                      <td
                        className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""} ${row.tag ? "" : "italic text-[#55656D] dark:text-[#A3B1B8]"
                          }`}
                      >
                        {row.session}
                      </td>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                        {row.tag ? <Tag label={row.tag} color={row.color as 'ember' | 'moss' | 'sky'} /> : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[13.5px] sm:text-[15px] text-[#55656D] dark:text-[#A3B1B8] mt-2.5">
              Con Lun/Mar/Mié + Sábado ya tienes las 4 sesiones que necesitas para
              progresar de verdad. El domingo es un extra: si aparece, mejor; si no, es
              descanso y no rompe nada.
            </p>
          </section>

          <DaySection id="pierna-a" title="Pierna A" tagLabel="Cuádriceps + core" tagColor="ember" rows={legA} />
          <DaySection id="torso-a" title="Torso A" tagLabel="Empuje + tracción" tagColor="moss" rows={torsoA} />
          <DaySection id="pierna-b" title="Pierna B" tagLabel="Cadera/Posterior + core" tagColor="ember" rows={legB} />
          <DaySection id="torso-b" title="Torso B" tagLabel="Espalda + brazos" tagColor="moss" rows={torsoB} />
          <DaySection
            id="opcional"
            title="Opcional"
            tagLabel="Full body ligero + cardio"
            tagColor="moss"
            intro={`Este día no suma estrés articular fuerte — es para moverte, trabajar puntos débiles y mejorar tu base cardiovascular, clave para que el "cambio de grasa a músculo" se vea más rápido.`}
            rows={opcional}
            nameHeader="Bloque"
            repsHeader="Tiempo"
          />

          <section id="movilidad-natacion" className="mb-10 scroll-mt-18">
            <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.09em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
              Días sin pesas
            </div>
            <h2 className={`${display} font-semibold text-[clamp(20px,4.5vw,26px)] mt-1.5`}>
              Movilidad y natación
            </h2>
            <p className="mt-2 text-[#55656D] dark:text-[#A3B1B8]">
              Son los días “activos”: no buscan cansarte, buscan que no te quedes quieto mientras tu cuerpo se recupera de las pesas.
            </p>
            <div className="grid gap-4 sm:grid-rows-2 mt-4">
              <div className={`${cardCls} p-4 sm:p-5`}>
                <h3 className={`${display} font-semibold text-lg sm:text-xl`}><Tag label="Movilidad" color="sky" /> <span className="ml-1">Lun y Jue</span></h3>
                <p className="mt-2 text-[14.5px] sm:text-[16px]">
                  Movimiento consciente y suave: caminar, trotar muy ligero o hacer ejercicios de movilidad. Es recuperación activa, no un entrenamiento.
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[14.5px] sm:text-[16px]">
                  <li><b>Duración:</b> 30–45 min.</li>
                  <li><b>Intensidad:</b> puedes hablar con normalidad todo el rato (RPE 3–4, ritmo conversacional).</li>
                  <li><b>Opciones:</b> caminata rápida, trote suave, movilidad de cadera, hombros y columna.</li>
                  <li><b>Para qué:</b> mejora la circulación, reduce la rigidez de las sesiones de fuerza y suma gasto calórico sin fatigar.</li>
                  <li><b>Evita:</b> convertirlo en un entrenamiento duro; si terminas agotado, fue demasiado.</li>
                </ul>
              </div>
              <div className={`${cardCls} p-4 sm:p-5`}>
                <h3 className={`${display} font-semibold text-lg sm:text-xl`}><Tag label="Natación" color="sky" /> <span className="ml-1">Viernes</span></h3>
                <p className="mt-2 text-[14.5px] sm:text-[16px]">
                  Una hora de piscina para mejorar el cardio y variar la rutina. Al ser de bajo impacto, descansa rodillas y espalda.
                </p>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[14.5px] sm:text-[16px]">
                  <li><b>Duración:</b> ~60 min, incluyendo pausas.</li>
                  <li><b>Intensidad:</b> moderada (RPE 5–6): nado continuo con descansos de 20–30 s cuando lo necesites.</li>
                  <li><b>Estructura sugerida:</b> 5–10 min suave, 40 min de largos alternando estilos, 5–10 min suelto.</li>
                  <li><b>Para qué:</b> capacidad cardiovascular, movilidad de hombros y recuperación de las piernas.</li>
                  <li><b>Ojo:</b> si el hombro molesta tras Torso A, nada más suave o prioriza patada y crol relajado.</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="reglas" className="mb-10 scroll-mt-18">
            <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.09em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
              Cómo progresar
            </div>
            <h2 className={`${display} font-semibold text-[clamp(20px,4.5vw,26px)] mt-1.5`}>
              Reglas del programa
            </h2>

            <div className="bg-[#FBE6DD] dark:bg-[#3A2A24] border border-[#BF4A2A]/35 dark:border-[#F0906A]/35 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 my-5 text-[14.5px] sm:text-[16px]">
              <strong className="text-[#BF4A2A] dark:text-[#F0906A]">Primeros 2 meses — fase de adaptación.</strong>{" "}
              Quita 1 serie de cada ejercicio principal y entrena a RPE 6–7 (dejando 3–4
              reps &quot;en el tanque&quot;). Tus tendones y articulaciones necesitan más
              tiempo que tu fuerza para readaptarse; esto evita lesiones y dolor muscular
              incapacitante.
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {rules.map((r) => (
                <div key={r.k} className={`${cardCls} p-4 sm:p-5`}>
                  <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.07em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
                    {r.k}
                  </div>
                  <div className="text-[14.5px] sm:text-[16px] mt-1.5 [&_b]:text-[#1C2A30] dark:[&_b]:text-[#E8EEF0]">{r.v}</div>
                </div>
              ))}
            </div>

            <div className={`${cardCls} p-4 sm:p-5 mt-4 border-[#BF4A2A]/40 dark:border-[#F0906A]/40`}>
              <h3 className={`${display} font-semibold text-lg sm:text-xl`}>Límites y precauciones</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-[14.5px] sm:text-[16px]">
                {limits.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#DDF0EB] dark:bg-[#1F3733] border border-[#1F7A6B]/35 dark:border-[#6FCDB9]/35 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 my-5 text-[14.5px] sm:text-[16px]">
              <strong className="text-[#1F7A6B] dark:text-[#6FCDB9]">
                La recomposición se gana también fuera del gimnasio.
              </strong>{" "}
              Proteína ≈ 1.8–2.2 g/kg/día (unos 155–190 g repartidos en 3–4 comidas),
              calorías en mantenimiento o con déficit leve — nunca agresivo, porque un
              déficit grande frena la ganancia muscular — y 7–8 h de sueño, que es donde
              realmente se recupera el tejido.
            </div>
          </section>

          <footer className="mt-2.5 text-[#55656D] dark:text-[#A3B1B8] text-[11.5px] sm:text-[13px] border-t border-[#D8E2E6] dark:border-[#2C373D] pt-4">
            Bitácora de Hierro — revisa cada 5–6 semanas y ajusta pesos y reps según tu
            progreso real, no según el plan en papel.
          </footer>
        </div>
      </div>
    </>
  );
}