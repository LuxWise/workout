import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getRoutines, getWeekDays } from "@/lib/routines";
import { PageHeading } from "@/components/admin/ui";
import { Plus } from "@/components/admin/icons";
import { Tag } from "@/components/tag";

const KIND = { strength: "Fuerza", optional: "Opcional", active: "Día activo" } as const;
const ORDER = { strength: 0, optional: 1, active: 2 } as const;

export default async function RoutinesPage() {
  await requireAdmin();
  const [routines, days] = await Promise.all([getRoutines(), getWeekDays()]);
  const sorted = [...routines].sort((a, b) => ORDER[a.kind] - ORDER[b.kind]);

  return (
    <>
      <PageHeading title="Rutinas">
        <Link
          href="/admin/rutinas/nueva"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-a-accent px-4 text-[15px] font-medium text-a-on-accent transition-colors hover:brightness-110"
        >
          <Plus className="size-4" />
          Nueva rutina
        </Link>
      </PageHeading>
      <ul className="divide-y divide-a-line overflow-hidden rounded-2xl border border-a-line bg-a-surface">
        {sorted.map((r) => {
          const used = days.filter((d) => d.routine === r.key).map((d) => d.day.slice(0, 3));
          return (
            <li key={r.key}>
              <Link href={`/admin/rutinas/${r.key}`} className="flex min-h-16 flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 transition-colors hover:bg-a-well sm:px-5">
                <span className="min-w-32 flex-1 text-[16px] font-semibold text-a-ink">{r.name}</span>
                <Tag label={r.tagLabel} color={r.tagColor} />
                <span className="w-full text-[13.5px] text-a-muted sm:w-auto sm:text-right">
                  {KIND[r.kind]} · {r.exercises.length} {r.exercises.length === 1 ? "ejercicio" : "ejercicios"} ·{" "}
                  {used.length ? used.join(", ") : "sin asignar"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
