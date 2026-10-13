import { requireAdmin } from "@/lib/auth";
import { getRoutines, getWeekDays } from "@/lib/routines";
import { PageHeading } from "@/components/admin/ui";
import { WeekEditor } from "./week-editor";

export default async function WeekPage() {
  await requireAdmin();
  const [days, routines] = await Promise.all([getWeekDays(), getRoutines()]);
  return (
    <>
      <PageHeading title="Semana" />
      <p className="mb-5 max-w-[60ch] text-[15px] text-a-muted">
        Cada fila es un día de la tabla “Semana a la vista”. Las flechas mueven la sesión entre días; el nombre del día se queda en su lugar.
      </p>
      <WeekEditor
        initial={days}
        routines={routines.map((r) => ({ key: r.key, name: r.name, kind: r.kind, tagLabel: r.tagLabel, tagColor: r.tagColor }))}
      />
    </>
  );
}
