import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getRoutines, getWeekDays } from "@/lib/routines";
import { PageHeading } from "@/components/admin/ui";
import { RoutineEditor } from "../routine-editor";

export default async function RoutinePage({ params }: PageProps<"/admin/rutinas/[key]">) {
  await requireAdmin();
  const { key } = await params;
  const [routines, days] = await Promise.all([getRoutines(), getWeekDays()]);
  const routine = routines.find((r) => r.key === key);
  if (!routine) notFound();

  return (
    <>
      <PageHeading title={routine.name} />
      <RoutineEditor
        routineKey={routine.key}
        initial={routine}
        usedIn={days.filter((d) => d.routine === routine.key).map((d) => d.day)}
      />
    </>
  );
}
