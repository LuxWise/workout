import { requireAdmin } from "@/lib/auth";
import { PageHeading } from "@/components/admin/ui";
import { RestoreCard } from "./restore-card";

export default async function SettingsPage() {
  await requireAdmin();
  return (
    <>
      <PageHeading title="Ajustes" />
      <RestoreCard />
    </>
  );
}
