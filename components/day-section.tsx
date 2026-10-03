import { ExerciseTable } from "./excercise-table";
import { Tag } from "./tag";

type Ex = { name: string; sets: string; reps: string; rest: string; note: string };

export function DaySection({
    id,
    title,
    tagLabel,
    tagColor,
    intro,
    rows,
    nameHeader,
    repsHeader,
}: {
    id: string;
    title: string;
    tagLabel: string;
    tagColor: "ember" | "moss" | "sky";
    intro?: string;
    rows: Ex[];
    nameHeader?: string;
    repsHeader?: string;
}) {
    return (
        <section id={id} className="mb-10 scroll-mt-18">
            <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-2.5 mb-1">
                <h2 className={`font-display font-semibold text-[clamp(22px,4.5vw,28px)]`}>{title}</h2>
                <Tag label={tagLabel} color={tagColor} />
            </div>
            {intro && <p className="text-[16px] text-[#55656D] dark:text-[#A3B1B8] mt-0 mb-3">{intro}</p>}
            <ExerciseTable rows={rows} nameHeader={nameHeader} repsHeader={repsHeader} />
        </section>
    );
}
