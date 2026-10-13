import { requireAdmin } from "@/lib/auth";
import { PageHeading } from "@/components/admin/ui";
import { RoutineEditor } from "../routine-editor";

export default async function NewRoutinePage() {
  await requireAdmin();
  return (
    <>
      <PageHeading title="Nueva rutina" />
      <RoutineEditor
        routineKey={null}
        usedIn={[]}
        initial={{ key: "", slug: "", name: "", kind: "strength", tagLabel: "", tagColor: "ember", exercises: [] }}
      />
    </>
  );
}
