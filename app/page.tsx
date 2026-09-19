import type { ReactNode } from "react";

// Bitácora de Hierro — página única, Tailwind CSS únicamente (sin tailwind.config
// adicional: los colores y tipografías del programa van como valores arbitrarios).
// Requiere las fuentes de Google (el <link> de abajo ya las carga).

type Ex = { name: string; sets: string; reps: string; rest: string; note: string };

const piernaA: Ex[] = [
  { name: "Sentadilla con barra", sets: "4", reps: "6–8", rest: "2–3 min", note: "RPE 7–8. Prioridad de la sesión." },
  { name: "Prensa de piernas", sets: "3", reps: "10–12", rest: "90 s", note: "Controla la bajada, sin bloquear rodilla." },
  { name: "Zancadas con mancuernas", sets: "3", reps: "10 c/pierna", rest: "90 s", note: "Paso largo, torso erguido." },
  { name: "Curl femoral en máquina", sets: "3", reps: "12–15", rest: "60 s", note: "Aprieta 1 s arriba." },
  { name: "Elevación de talones de pie", sets: "3", reps: "15–20", rest: "60 s", note: "Rango completo." },
  { name: "Plancha abdominal", sets: "3", reps: "30–45 s", rest: "45 s", note: "Glúteo y abdomen activos." },
];

const torsoA: Ex[] = [
  { name: "Press de banca con barra", sets: "4", reps: "6–8", rest: "2–3 min", note: "RPE 7–8. Prioridad de la sesión." },
  { name: "Remo en máquina o barra", sets: "4", reps: "8–10", rest: "2 min", note: "Escápulas atrás antes de tirar." },
  { name: "Press militar con mancuernas", sets: "3", reps: "8–10", rest: "90 s", note: "Sentado, evita arquear espalda." },
  { name: "Jalón al pecho en polea", sets: "3", reps: "10–12", rest: "90 s", note: "Agarre medio, tira con el codo." },
  { name: "Aperturas en polea o pec-deck", sets: "3", reps: "12–15", rest: "60 s", note: "Estira bien, no sobrecargues." },
  { name: "Face pull en polea", sets: "3", reps: "15", rest: "45 s", note: "Salud de hombro, peso ligero." },
];

const piernaB: Ex[] = [
  { name: "Peso muerto rumano con barra", sets: "4", reps: "8–10", rest: "2–3 min", note: "RPE 7–8. Técnica antes que carga." },
  { name: "Hip thrust con barra", sets: "3", reps: "10–12", rest: "90 s", note: "Pausa 1 s arriba, glúteo apretado." },
  { name: "Sentadilla búlgara con mancuernas", sets: "3", reps: "10 c/pierna", rest: "90 s", note: "Pie trasero elevado, torso estable." },
  { name: "Extensión de cuádriceps en máquina", sets: "3", reps: "12–15", rest: "60 s", note: "Aprieta 1 s arriba." },
  { name: "Elevación de talones sentado", sets: "3", reps: "15–20", rest: "60 s", note: "Rango completo." },
  { name: "Cable crunch o rueda abdominal", sets: "3", reps: "12–15", rest: "45 s", note: "Curva la columna, no tires de cadera." },
];

const torsoB: Ex[] = [
  { name: "Dominadas asistidas o jalón supino", sets: "4", reps: "6–10", rest: "2 min", note: "Usa asistencia si aún no haces dominadas limpias." },
  { name: "Press inclinado con mancuernas", sets: "4", reps: "8–10", rest: "2 min", note: "Banco a 30°, control en la bajada." },
  { name: "Remo en polea baja (sentado)", sets: "3", reps: "10–12", rest: "90 s", note: "No balancees el torso." },
  { name: "Press de hombro en máquina", sets: "3", reps: "10–12", rest: "90 s", note: "Rango cómodo, sin dolor de hombro." },
  { name: "Curl de bíceps con barra/mancuernas", sets: "3", reps: "10–12", rest: "60 s", note: "Codos fijos al cuerpo." },
  { name: "Extensión de tríceps en polea", sets: "3", reps: "10–12", rest: "60 s", note: "Codos pegados, solo se mueve el antebrazo." },
];

const opcional: Ex[] = [
  { name: "Cardio zona 2 (bici, caminadora inclinada o elíptica)", sets: "—", reps: "20–25 min", rest: "—", note: "Ritmo conversacional, no llegues sin aire." },
  { name: "Circuito ligero: zancada + press mancuerna + remo con banda", sets: "2–3", reps: "12 reps c/u", rest: "60 s", note: "Peso bajo, es mantenimiento, no esfuerzo máximo." },
  { name: "Movilidad de cadera y hombro", sets: "—", reps: "10 min", rest: "—", note: "Estiramientos + rotaciones controladas." },
];

const week = [
  { day: "Lunes", slot: "Mañana", session: "Pierna A", tag: "Cuádriceps", color: "ember" as const },
  { day: "Martes", slot: "Tarde", session: "Torso A", tag: "Pecho/Hombro", color: "moss" as const },
  { day: "Miércoles", slot: "Mañana", session: "Pierna B", tag: "Cadera/Posterior", color: "ember" as const },
  { day: "Jueves", slot: "—", session: "Descanso", tag: null, color: null },
  { day: "Viernes", slot: "—", session: "Descanso", tag: null, color: null },
  { day: "Sábado", slot: "Mañana", session: "Torso B", tag: "Espalda/Brazos", color: "moss" as const },
  { day: "Domingo", slot: "Mañana", session: "Opcional — full body ligero", tag: null, color: null },
];

const rules: { k: string; v: ReactNode }[] = [
  { k: "SEM 3+", v: <>Vuelve al volumen completo de las tablas. Trabaja los ejercicios principales (el primero de cada día) a <b className="text-[#211E1A] dark:text-[#EDE8DE]">RPE 7–9</b> y los accesorios a <b className="text-[#211E1A] dark:text-[#EDE8DE]">RPE 8–9</b>.</> },
  { k: "SOBRECARGA", v: <>Cuando completes todas las series en el tope del rango de reps con buena técnica durante 2 sesiones seguidas, sube el peso: <b className="text-[#211E1A] dark:text-[#EDE8DE]">+2.5 kg</b> en tren superior, <b className="text-[#211E1A] dark:text-[#EDE8DE]">+5 kg</b> en tren inferior.</> },
  { k: "DELOAD", v: "Cada 5–6 semanas, una semana con 40% menos volumen y peso más liviano. No es un día perdido: es lo que te permite seguir subiendo carga sin acumular fatiga ni molestias en rodillas/hombros." },
  { k: "MÍNIMO VIABLE", v: "Si una semana solo salen Lunes/Martes/Miércoles, entrénalos igual — son las 3 sesiones que más importan. El sábado y domingo son el plus que acelera el resultado, no el mínimo necesario." },
];

const mono = "font-['IBM_Plex_Mono']";
const display = "font-['Oswald']";
const cardCls =
  "bg-white dark:bg-[#27231F] border border-[#E4DFD3] dark:border-[#3A352F] rounded-2xl";
const chipCls =
  `${mono} text-[12.5px] no-underline text-[#211E1A] dark:text-[#EDE8DE] bg-white dark:bg-[#27231F] border border-[#E4DFD3] dark:border-[#3A352F] rounded-full px-3.5 py-1.5 whitespace-nowrap hover:border-[#C6491F] hover:text-[#C6491F] dark:hover:border-[#E47C4C] dark:hover:text-[#E47C4C]`;

function Tag({ label, color }: { label: string; color: "ember" | "moss" }) {
  const cls =
    color === "ember"
      ? "bg-[#F3E0D6] text-[#C6491F] dark:bg-[#3C2A20] dark:text-[#E47C4C]"
      : "bg-[#E3E9DD] text-[#4B6B44] dark:bg-[#293424] dark:text-[#8BB57E]";
  return (
    <span className={`${mono} inline-block text-[11px] uppercase tracking-[0.06em] font-semibold rounded-full px-2.5 py-[3px] ${cls}`}>
      {label}
    </span>
  );
}

function ExerciseTable({
  rows,
  nameHeader = "Ejercicio",
  repsHeader = "Reps",
}: {
  rows: Ex[];
  nameHeader?: string;
  repsHeader?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] table-fixed border-collapse mt-1">
        <thead>
          <tr>
            <th className={`${mono} w-[34%] text-left text-[11px] uppercase tracking-[0.05em] text-[#6E6A63] dark:text-[#9A948A] font-semibold px-2 py-2.5 border-b border-[#E4DFD3] dark:border-[#3A352F]`}>
              {nameHeader}
            </th>
            <th className={`${mono} w-[13%] text-left text-[11px] uppercase tracking-[0.05em] text-[#6E6A63] dark:text-[#9A948A] font-semibold px-2 py-2.5 border-b border-[#E4DFD3] dark:border-[#3A352F]`}>
              Series
            </th>
            <th className={`${mono} w-[13%] text-left text-[11px] uppercase tracking-[0.05em] text-[#6E6A63] dark:text-[#9A948A] font-semibold px-2 py-2.5 border-b border-[#E4DFD3] dark:border-[#3A352F]`}>
              {repsHeader}
            </th>
            <th className={`${mono} w-[13%] text-left text-[11px] uppercase tracking-[0.05em] text-[#6E6A63] dark:text-[#9A948A] font-semibold px-2 py-2.5 border-b border-[#E4DFD3] dark:border-[#3A352F]`}>
              Desc.
            </th>
            <th className="w-[27%] text-left text-[11px] uppercase tracking-[0.05em] text-[#6E6A63] dark:text-[#9A948A] font-semibold px-2 py-2.5 border-b border-[#E4DFD3] dark:border-[#3A352F]">
              Nota
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className={`px-2 py-2.5 text-[14.5px] align-top ${i < rows.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                {r.name}
              </td>
              <td className={`${mono} px-2 py-2.5 text-[14px] tabular-nums align-top ${i < rows.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                {r.sets}
              </td>
              <td className={`${mono} px-2 py-2.5 text-[14px] tabular-nums align-top ${i < rows.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                {r.reps}
              </td>
              <td className={`${mono} px-2 py-2.5 text-[14px] tabular-nums align-top ${i < rows.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                {r.rest}
              </td>
              <td className={`px-2 py-2.5 text-[13.5px] text-[#6E6A63] dark:text-[#9A948A] align-top ${i < rows.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                {r.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DaySection({
  id,
  title,
  tagLabel,
  tagColor,
  meta,
  intro,
  rows,
  nameHeader,
  repsHeader,
}: {
  id: string;
  title: string;
  tagLabel: string;
  tagColor: "ember" | "moss";
  meta: string;
  intro?: string;
  rows: Ex[];
  nameHeader?: string;
  repsHeader?: string;
}) {
  return (
    <section id={id} className="mb-10 scroll-mt-[72px]">
      <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-2.5 mb-1">
        <h2 className={`${display} font-semibold text-[clamp(22px,4.5vw,28px)]`}>{title}</h2>
        <Tag label={tagLabel} color={tagColor} />
        <span className={`${mono} text-[12.5px] text-[#6E6A63] dark:text-[#9A948A]`}>{meta}</span>
      </div>
      {intro && <p className="text-[14.5px] text-[#6E6A63] dark:text-[#9A948A] mt-0 mb-3">{intro}</p>}
      <ExerciseTable rows={rows} nameHeader={nameHeader} repsHeader={repsHeader} />
    </section>
  );
}

export default function BitacoraDeHierro() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@500;600&display=swap"
      />

      <div className={`min-h-screen bg-[#F6F3EC] dark:bg-[#1D1A17] text-[#211E1A] dark:text-[#EDE8DE] font-['Work_Sans'] text-base leading-[1.55]`}>
        <div className="max-w-[760px] mx-auto px-5 pt-7 pb-[60px]">
          <header className="mb-5">
            <div className={`${mono} text-[12px] uppercase tracking-[0.09em] text-[#C6491F] dark:text-[#E47C4C] font-semibold`}>
              Programa de recomposición · 4–5 sesiones / semana
            </div>
            <h1 className={`${display} font-semibold text-[clamp(28px,6vw,38px)] tracking-[0.01em] [text-wrap:balance] mt-1`}>
              Bitácora de Hierro
            </h1>
            <p className="mt-2 text-[#6E6A63] dark:text-[#9A948A] max-w-[60ch]">
              Torso/Pierna a doble frecuencia, pensado para tu calendario real: trabajo,
              universidad y sesiones de 60–90 min. El objetivo no es la báscula — es
              convertir el peso ganado en músculo.
            </p>
          </header>

          <nav
            aria-label="Ir a sección"
            className="flex flex-wrap gap-2 pt-2.5 pb-5 border-b border-[#E4DFD3] dark:border-[#3A352F] mb-6 sticky top-[env(safe-area-inset-top,0px)] bg-[#F6F3EC] dark:bg-[#1D1A17] z-10"
          >
            <a href="#resumen" className={chipCls}>Resumen</a>
            <a href="#pierna-a" className={chipCls}>Lun · Pierna A</a>
            <a href="#torso-a" className={chipCls}>Mar · Torso A</a>
            <a href="#pierna-b" className={chipCls}>Mié · Pierna B</a>
            <a href="#torso-b" className={chipCls}>Sáb · Torso B</a>
            <a href="#opcional" className={chipCls}>Dom · Opcional</a>
            <a href="#reglas" className={chipCls}>Reglas</a>
          </nav>

          <section id="resumen" className="mb-10 scroll-mt-[72px]">
            <div className={`${mono} text-[12px] uppercase tracking-[0.09em] text-[#C6491F] dark:text-[#E47C4C] font-semibold`}>
              Resumen
            </div>
            <h2 className={`${display} font-semibold text-[clamp(22px,4.5vw,26px)] mt-1.5`}>
              Empecemos
            </h2>

            <div className="flex flex-col gap-3.5 mt-4">
                <div className={`${cardCls} p-5 flex flex-col gap-1.5`}>
                <span className={`${mono} text-[12px] uppercase tracking-[0.07em] text-[#6E6A63] dark:text-[#9A948A]`}>
                  Primeros 2 meses — fase de adaptación (RPE 6–7, 1 serie menos en cada ejercicio principal)
                </span>
                  Esta fase esta propuesta para los primeros 2 meses, para que tus articulaciones y tendones se adapten a la carga de trabajo. No es flojera: tu fuerza volverá rápido, pero tus articulaciones llevan 2 años sin esta carga. Esto evita lesiones y dolor muscular incapacitante en la primera semana.
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-4">
              <div className={`${cardCls} p-5 flex flex-col gap-1.5`}>
                <span className={`${mono} text-[12px] uppercase tracking-[0.07em] text-[#6E6A63] dark:text-[#9A948A]`}>
                  Calentamiento (antes de cada sesión, ~8–10 min)
                </span>
                5 min de cardio suave (bici o trote ligero) + movilidad de cadera/hombro
                + 2–3 series de aproximación del primer ejercicio al 40%→60%→80% del peso
                de trabajo.
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse mt-3.5 text-[14.5px]">
                <caption className={`${mono} text-left text-[12px] uppercase tracking-[0.07em] text-[#6E6A63] dark:text-[#9A948A] mb-2`}>
                  Semana a la vista
                </caption>
                <thead>
                  <tr>
                    {["Día", "Franja", "Sesión", "Foco"].map((h) => (
                      <th
                        key={h}
                        className={`${mono} text-left text-[11.5px] uppercase tracking-[0.06em] text-[#6E6A63] dark:text-[#9A948A] font-semibold px-2.5 py-2 border-b border-[#E4DFD3] dark:border-[#3A352F]`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {week.map((row, i) => (
                    <tr key={row.day}>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                        {row.day}
                      </td>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                        {row.slot}
                      </td>
                      <td
                        className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""} ${
                          row.tag ? "" : "italic text-[#6E6A63] dark:text-[#9A948A]"
                        }`}
                      >
                        {row.session}
                      </td>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#E4DFD3] dark:border-[#3A352F]" : ""}`}>
                        {row.tag ? <Tag label={row.tag} color={row.color as "ember" | "moss"} /> : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[13.5px] text-[#6E6A63] dark:text-[#9A948A] mt-2.5">
              Con Lun/Mar/Mié + Sábado ya tienes las 4 sesiones que necesitas para
              progresar de verdad. El domingo es un extra: si aparece, mejor; si no, es
              descanso y no rompe nada.
            </p>
          </section>

          <DaySection id="pierna-a" title="Pierna A" tagLabel="Cuádriceps + core" tagColor="ember" meta="LUNES · MAÑANA · ~70 MIN" rows={piernaA} />
          <DaySection id="torso-a" title="Torso A" tagLabel="Empuje + tracción" tagColor="moss" meta="MARTES · TARDE · ~70 MIN" rows={torsoA} />
          <DaySection id="pierna-b" title="Pierna B" tagLabel="Cadera/Posterior + core" tagColor="ember" meta="MIÉRCOLES · MAÑANA · ~70 MIN" rows={piernaB} />
          <DaySection id="torso-b" title="Torso B" tagLabel="Espalda + brazos" tagColor="moss" meta="SÁBADO · MAÑANA · ~70 MIN" rows={torsoB} />
          <DaySection
            id="opcional"
            title="Opcional"
            tagLabel="Full body ligero + cardio"
            tagColor="moss"
            meta="DOMINGO · MAÑANA · ~45–60 MIN"
            intro={`Este día no suma estrés articular fuerte — es para moverte, trabajar puntos débiles y mejorar tu base cardiovascular, clave para que el "cambio de grasa a músculo" se vea más rápido.`}
            rows={opcional}
            nameHeader="Bloque"
            repsHeader="Tiempo"
          />

          <section id="reglas" className="mb-10 scroll-mt-[72px]">
            <div className={`${mono} text-[12px] uppercase tracking-[0.09em] text-[#C6491F] dark:text-[#E47C4C] font-semibold`}>
              Cómo progresar
            </div>
            <h2 className={`${display} font-semibold text-[clamp(22px,4.5vw,26px)] mt-1.5`}>
              Reglas del programa
            </h2>

            <div className="bg-[#F3E0D6] dark:bg-[#3C2A20] border border-[#C6491F]/35 dark:border-[#E47C4C]/35 rounded-xl px-4.5 py-4 my-4.5 text-[14.5px]">
              <strong className="text-[#C6491F] dark:text-[#E47C4C]">Semanas 1–2 — fase de adaptación.</strong>{" "}
              Quita 1 serie de cada ejercicio principal y entrena a RPE 6–7 (dejando 3–4
              reps &quot;en el tanque&quot;). No es flojera: tus tendones y
              articulaciones llevan 2 años sin esta carga, aunque tu fuerza vuelva
              rápido. Esto evita lesiones y dolor muscular incapacitante en la primera
              semana.
            </div>

            <div className="flex flex-col gap-3.5 mt-3.5">
              {rules.map((r) => (
                <div key={r.k} className="flex flex-col sm:flex-row gap-1 sm:gap-3.5">
                  <div className={`${mono} text-[12px] text-[#C6491F] dark:text-[#E47C4C] font-semibold whitespace-nowrap sm:min-w-[86px] sm:pt-0.5`}>
                    {r.k}
                  </div>
                  <div className="text-[14.5px]">{r.v}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#E3E9DD] dark:bg-[#293424] border border-[#4B6B44]/35 dark:border-[#8BB57E]/35 rounded-xl px-4.5 py-4 my-4.5 text-[14.5px]">
              <strong className="text-[#4B6B44] dark:text-[#8BB57E]">
                La recomposición se gana también fuera del gimnasio.
              </strong>{" "}
              Proteína ≈ 1.8–2.2 g/kg/día (unos 155–190 g repartidos en 3–4 comidas),
              calorías en mantenimiento o con déficit leve — nunca agresivo, porque un
              déficit grande frena la ganancia muscular — y 7–8 h de sueño, que es donde
              realmente se recupera el tejido.
            </div>
          </section>

          <footer className="mt-2.5 text-[#6E6A63] dark:text-[#9A948A] text-[13px] border-t border-[#E4DFD3] dark:border-[#3A352F] pt-4">
            Bitácora de Hierro — revisa cada 5–6 semanas y ajusta pesos y reps según tu
            progreso real, no según el plan en papel.
          </footer>
        </div>
      </div>
    </>
  );
}