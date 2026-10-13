"use client";

import { useState, useTransition } from "react";
import { restoreDefaults } from "../../actions";
import { ConfirmButton, Panel } from "@/components/admin/ui";
import { Alert, Check } from "@/components/admin/icons";

export function RestoreCard() {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <Panel title="Restaurar datos originales" description="Vuelve a cargar rutinas, semana y textos desde los archivos de app/config.">
      <div className="flex flex-col items-start gap-3">
        <p className="max-w-[60ch] text-[14.5px] text-a-ink">
          Esto <b>borra todos tus cambios</b>: ejercicios editados, rutinas nuevas, el orden de la semana y los textos. No se puede deshacer.
        </p>
        <ConfirmButton
          label="Restaurar datos originales"
          confirmLabel="Confirmar: borrar mis cambios"
          icon={false}
          disabled={pending}
          onConfirm={() =>
            start(async () => {
              const r = await restoreDefaults();
              setResult(r.ok ? { ok: true, text: r.message ?? "Restaurado" } : { ok: false, text: r.error });
            })
          }
        />
        {pending && <p className="text-[14px] text-a-muted">Restaurando…</p>}
        {result && (
          <p role="status" className={`flex items-center gap-2 text-[14px] ${result.ok ? "text-a-ok" : "text-a-danger"}`}>
            {result.ok ? <Check className="size-4" /> : <Alert className="size-4" />}
            {result.text}
          </p>
        )}
      </div>
    </Panel>
  );
}
