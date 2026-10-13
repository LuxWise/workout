import { requireAdmin } from "@/lib/auth";
import { getContent } from "@/lib/routines";
import { PageHeading } from "@/components/admin/ui";
import { ContentEditor } from "./content-editor";

export default async function ContentPage() {
  await requireAdmin();
  return (
    <>
      <PageHeading title="Textos" />
      <p className="mb-5 max-w-[60ch] text-[15px] text-a-muted">
        Todo el texto de la página pública que no es una tabla. Usa <b>**doble asterisco**</b> para poner en negrita.
      </p>
      <ContentEditor initial={await getContent()} />
    </>
  );
}
