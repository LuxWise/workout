import { DaySection } from "@/components/day-section";
import { Tag } from "@/components/tag";
import { getProgram } from "@/lib/routines";
import type { WeekEntry } from "@/lib/types";
import { RichText, fillTokens } from "@/components/rich-text";

const short = (day: string) => day.slice(0, 3);
const joinEs = (xs: string[]) =>
  xs.length > 1 ? `${xs.slice(0, -1).join(", ")} y ${xs[xs.length - 1]}` : xs.join("");

const mono = "font-sans";
const display = "font-display";
const cardCls =
  "bg-white dark:bg-[#1B2327] border border-[#D8E2E6] dark:border-[#2C373D] rounded-2xl";
const chipCls =
  `${mono} text-[14.5px] sm:text-[16px] no-underline text-[#1C2A30] dark:text-[#E8EEF0] bg-white dark:bg-[#1B2327] border border-[#D8E2E6] dark:border-[#2C373D] rounded-full px-3.5 py-1.5 whitespace-nowrap hover:border-[#BF4A2A] hover:text-[#BF4A2A] dark:hover:border-[#F0906A] dark:hover:text-[#F0906A]`;

export default async function BitacoraDeHierro() {
  const { routines, week, content } = await getProgram();
  const strengthWeek = week
    .filter((w: WeekEntry) => w.routineDoc.kind === "strength")
    .filter((w, i, all) => all.findIndex((x) => x.routine === w.routine) === i);
  const strengthDays = joinEs(strengthWeek.map((w) => w.day));
  const mobilityDays = joinEs(week.filter((w) => w.routine === "mobility").map((w) => short(w.day)));
  const poolDays = joinEs(week.filter((w) => w.routine === "pool").map((w) => w.day));
  const fill = (t: string) => fillTokens(t, strengthDays, strengthWeek.length);
  const activeCards = [
    { key: "mobility", label: "Movilidad", color: "sky" as const, days: mobilityDays, card: content.active.mobility },
    { key: "pool", label: "Natación", color: "sky" as const, days: poolDays, card: content.active.pool },
  ];
  const optionalRoutines = routines.filter((r) => r.kind === "optional");

  return (
    <>

      <div className={`min-h-screen bg-[#F4F7F8] dark:bg-[#12181B] text-[#1C2A30] dark:text-[#E8EEF0] font-sans text-[15px] sm:text-base leading-[1.6]`}>
        <div className="max-w-190 mx-auto px-4 sm:px-5 pt-6 sm:pt-7 pb-15">
          <header className="mb-5">
            <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.09em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
              {content.header.eyebrow}
            </div>
            <h1 className={`${display} font-semibold text-[clamp(26px,6vw,38px)] tracking-[0.01em] [text:balance] mt-1`}>
              {content.header.title}
            </h1>
            <p className="mt-2 text-[#55656D] dark:text-[#A3B1B8] max-w-[60ch]">
              {content.header.intro}
            </p>
          </header>

          <nav
            aria-label="Ir a sección"
            className="flex flex-wrap gap-2 pt-2.5 pb-5 border-b border-[#D8E2E6] dark:border-[#2C373D] mb-6 sticky top-[env(safe-area-inset-top,0px)] bg-[#F4F7F8] dark:bg-[#12181B] z-10"
          >
            <a href="#resumen" className={chipCls}>Resumen</a>
            {strengthWeek.map((w) => (
              <a key={w.day} href={`#${w.routineDoc.slug}`} className={chipCls}>
                {short(w.day)} · {w.routineDoc.name}
              </a>
            ))}
            {optionalRoutines.map((r) => (
              <a key={r.key} href={`#${r.slug}`} className={chipCls}>{r.name}</a>
            ))}
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
                  {content.adaptation.label}
                </span>
                {content.adaptation.body}
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-4">
              <div className={`${cardCls} p-4 sm:p-5 flex flex-col gap-1.5`}>
                <span className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.07em] text-[#55656D] dark:text-[#A3B1B8]`}>
                  {content.warmup.label}
                </span>
                <ol className="list-decimal pl-5 mt-1 space-y-2 text-[14.5px] sm:text-[16px]">
                  {content.warmup.steps.map((step, i) => (
                    <li key={i}><RichText text={step} /></li>
                  ))}
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
                        {row.routineDoc.name}
                      </td>
                      <td className={`px-2.5 py-2.5 align-top ${i < week.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                        {row.tag ? <Tag label={row.tag} color={row.color} /> : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[13.5px] sm:text-[15px] text-[#55656D] dark:text-[#A3B1B8] mt-2.5">
              {fill(content.weekNote)}
            </p>
          </section>

          {strengthWeek.map((w) => {
            const r = w.routineDoc;
            return (
              <DaySection key={r.key} id={r.slug} title={r.name} tagLabel={r.tagLabel} tagColor={r.tagColor} rows={r.exercises} />
            );
          })}
          {optionalRoutines.map((r) => (
            <DaySection
              key={r.key}
              id={r.slug}
              title={r.name}
              tagLabel={r.tagLabel}
              tagColor={r.tagColor}
              intro={r.intro}
              rows={r.exercises}
              nameHeader={r.nameHeader}
              repsHeader={r.repsHeader}
            />
          ))}

          <section id="movilidad-natacion" className="mb-10 scroll-mt-18">
            <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.09em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
              Días sin pesas
            </div>
            <h2 className={`${display} font-semibold text-[clamp(20px,4.5vw,26px)] mt-1.5`}>
              Movilidad y natación
            </h2>
            <p className="mt-2 text-[#55656D] dark:text-[#A3B1B8]">
              {content.active.intro}
            </p>
            <div className="grid gap-4 sm:grid-rows-2 mt-4">
              {activeCards.map((c) => (
                <div key={c.key} className={`${cardCls} p-4 sm:p-5`}>
                  <h3 className={`${display} font-semibold text-lg sm:text-xl`}><Tag label={c.label} color={c.color} /> <span className="ml-1">{c.days}</span></h3>
                  <p className="mt-2 text-[14.5px] sm:text-[16px]">{c.card.body}</p>
                  <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[14.5px] sm:text-[16px]">
                    {c.card.bullets.map((b, i) => (
                      <li key={i}><b>{b.k}:</b> <RichText text={b.v} /></li>
                    ))}
                  </ul>
                </div>
              ))}
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
              <strong className="text-[#BF4A2A] dark:text-[#F0906A]">{content.rules.adaptationTitle}</strong>{" "}
              {content.rules.adaptationBody}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.rules.items.map((r) => (
                <div key={r.k} className={`${cardCls} p-4 sm:p-5`}>
                  <div className={`${mono} text-[11.5px] sm:text-[13px] uppercase tracking-[0.07em] text-[#BF4A2A] dark:text-[#F0906A] font-semibold`}>
                    {r.k}
                  </div>
                  <div className="text-[14.5px] sm:text-[16px] mt-1.5 [&_b]:text-[#1C2A30] dark:[&_b]:text-[#E8EEF0]"><RichText text={fill(r.v)} /></div>
                </div>
              ))}
            </div>

            <div className={`${cardCls} p-4 sm:p-5 mt-4 border-[#BF4A2A]/40 dark:border-[#F0906A]/40`}>
              <h3 className={`${display} font-semibold text-lg sm:text-xl`}>{content.rules.limitsTitle}</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-[14.5px] sm:text-[16px]">
                {content.rules.limits.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#DDF0EB] dark:bg-[#1F3733] border border-[#1F7A6B]/35 dark:border-[#6FCDB9]/35 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 my-5 text-[14.5px] sm:text-[16px]">
              <strong className="text-[#1F7A6B] dark:text-[#6FCDB9]">
                {content.rules.nutritionTitle}
              </strong>{" "}
              {content.rules.nutritionBody}
            </div>
          </section>

          <footer className="mt-2.5 text-[#55656D] dark:text-[#A3B1B8] text-[11.5px] sm:text-[13px] border-t border-[#D8E2E6] dark:border-[#2C373D] pt-4">
            {content.footer}
          </footer>
        </div>
      </div>
    </>
  );
}