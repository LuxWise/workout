"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteRoutine, saveRoutine } from "../../actions";
import { Button, ColorPicker, ConfirmButton, Field, IconButton, Panel, RowTools, SaveBar, Select, TextArea, TextInput, cx, useEditor } from "@/components/admin/ui";
import { Alert, ChevronDown, Copy, Plus, Trash } from "@/components/admin/icons";
import type { Exercise, Routine } from "@/lib/types";

const LOCKED = ["mobility", "pool"];
const blank: Exercise = { name: "", sets: "", reps: "", rest: "", note: "" };

export function RoutineEditor({ routineKey, initial, usedIn }: { routineKey: string | null; initial: Routine; usedIn: string[] }) {
  const router = useRouter();
  const isNew = routineKey === null;
  const { value: r, setValue, dirty, pending, status, submit, discard } = useEditor(
    initial,
    (v) => saveRoutine(routineKey, v),
    (res) => {
      if (isNew && res.key) router.replace(`/admin/rutinas/${res.key}`);
      else router.refresh();
    },
  );
  const [deleting, startDelete] = useTransition();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const set = <K extends keyof Routine>(k: K, v: Routine[K]) => setValue({ ...r, [k]: v });
  const setEx = (i: number, p: Partial<Exercise>) => set("exercises", r.exercises.map((e, j) => (j === i ? { ...e, ...p } : e)));
  const moveEx = (from: number, to: number) => {
    const next = [...r.exercises];
    next.splice(to, 0, next.splice(from, 1)[0]);
    set("exercises", next);
  };

  const active = r.kind === "active";
  const isOptional = r.kind === "optional";
  const locked = !isNew && LOCKED.includes(r.key);
  const nameHeader = r.nameHeader || (isOptional ? "Bloque" : "Ejercicio");
  const repsHeader = r.repsHeader || (isOptional ? "Tiempo" : "Reps");

  return (
    <div className="flex flex-col gap-5">
      {!isNew && !active && usedIn.length === 0 && (
        <p className="flex items-start gap-2 rounded-xl bg-a-accent-soft px-4 py-3 text-[14px] text-a-ink">
          <Alert className="mt-0.5 size-4 shrink-0 text-a-accent" />
          <span>
            {isOptional
              ? "Las rutinas opcionales se muestran siempre en la página."
              : "Esta rutina no aparece en la página hasta que la asignes a un día en Semana."}
          </span>
        </p>
      )}

      <Panel title="Datos de la rutina">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nombre">
            <TextInput value={r.name} onChange={(e) => set("name", e.target.value)} placeholder="Ej. Pierna C" />
          </Field>
          <Field label="Tipo" hint={isNew ? undefined : "El tipo no se puede cambiar."}>
            <Select value={r.kind} disabled={!isNew} onChange={(e) => set("kind", e.target.value as Routine["kind"])}>
              <option value="strength">Fuerza (tabla con sección propia)</option>
              <option value="optional">Opcional (bloque extra)</option>
              {active && <option value="active">Día activo</option>}
            </Select>
          </Field>
          <Field label="Etiqueta" hint="Texto de la píldora junto al título.">
            <TextInput value={r.tagLabel} onChange={(e) => set("tagLabel", e.target.value)} placeholder="Ej. Cuádriceps + core" />
          </Field>
          <ColorPicker value={r.tagColor} onChange={(c) => set("tagColor", c)} />
        </div>
        {!active && (
          <details className="group mt-4 border-t border-a-line pt-3">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-[14px] font-medium text-a-muted hover:text-a-ink [&::-webkit-details-marker]:hidden">
              Texto introductorio y encabezados de tabla
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <Field label="Introducción" className="sm:col-span-2">
                <TextArea value={r.intro ?? ""} onChange={(e) => set("intro", e.target.value)} />
              </Field>
              <Field label="Encabezado de nombre" hint="Por defecto: Ejercicio">
                <TextInput value={r.nameHeader ?? ""} onChange={(e) => set("nameHeader", e.target.value)} placeholder="Ejercicio" />
              </Field>
              <Field label="Encabezado de reps" hint="Por defecto: Reps">
                <TextInput value={r.repsHeader ?? ""} onChange={(e) => set("repsHeader", e.target.value)} placeholder="Reps" />
              </Field>
            </div>
          </details>
        )}
      </Panel>

      {active ? (
        <Panel>
          <p className="text-[14.5px] text-a-muted">
            Este día no tiene tabla de ejercicios. Su descripción (duración, intensidad, opciones) se edita en <Link href="/admin/textos" className="text-a-accent underline underline-offset-4">Textos</Link>.
          </p>
        </Panel>
      ) : (
        <Panel
          title={`${r.exercises.length} ${r.exercises.length === 1 ? "ejercicio" : "ejercicios"}`}
          description="Se muestran en este orden en la tabla pública."
        >
          {r.exercises.length === 0 && (
            <p className="mb-4 rounded-xl border border-dashed border-a-line px-4 py-6 text-center text-[14.5px] text-a-muted">
              Aún no hay ejercicios. Agrega el primero para empezar la tabla.
            </p>
          )}
          <ol className="flex flex-col gap-3">
            {r.exercises.map((e, i) => (
              <li key={i} className="rounded-xl border border-a-line bg-a-well/40 p-3 sm:p-4">
                <div className="flex items-start gap-2">
                  <span className="mt-3 w-5 shrink-0 text-center text-[13px] tabular-nums text-a-muted">{i + 1}</span>
                  <Field label={nameHeader} className="flex-1">
                    <TextInput value={e.name} onChange={(ev) => setEx(i, { name: ev.target.value })} className="font-medium" />
                  </Field>
                </div>
                <div className="mt-3 grid grid-cols-[1fr_1.6fr_1fr] gap-2 sm:pl-7 sm:gap-3">
                  <Field label="Series">
                    <TextInput inputMode="text" value={e.sets} onChange={(ev) => setEx(i, { sets: ev.target.value })} />
                  </Field>
                  <Field label={repsHeader}>
                    <TextInput value={e.reps} onChange={(ev) => setEx(i, { reps: ev.target.value })} />
                  </Field>
                  <Field label="Desc.">
                    <TextInput value={e.rest} onChange={(ev) => setEx(i, { rest: ev.target.value })} />
                  </Field>
                </div>
                <div className="mt-3 sm:pl-7">
                  <Field label="Nota">
                    <TextInput value={e.note} onChange={(ev) => setEx(i, { note: ev.target.value })} />
                  </Field>
                </div>
                <div className="mt-2 flex justify-end sm:pl-7">
                  <RowTools index={i} count={r.exercises.length} onMove={(to) => moveEx(i, to)}>
                    <IconButton label="Duplicar" onClick={() => set("exercises", [...r.exercises.slice(0, i + 1), { ...e }, ...r.exercises.slice(i + 1)])}>
                      <Copy />
                    </IconButton>
                    <IconButton label={`Quitar ${e.name || `ejercicio ${i + 1}`}`} onClick={() => set("exercises", r.exercises.filter((_, j) => j !== i))}>
                      <Trash />
                    </IconButton>
                  </RowTools>
                </div>
              </li>
            ))}
          </ol>
          <Button className={cx(r.exercises.length ? "mt-3" : "")} onClick={() => set("exercises", [...r.exercises, { ...blank }])}>
            <Plus className="size-4" />
            Agregar ejercicio
          </Button>
        </Panel>
      )}

      {!isNew && (
        <Panel title="Eliminar rutina">
          {locked ? (
            <p className="text-[14.5px] text-a-muted">Esta rutina alimenta una tarjeta fija de la página y no se puede eliminar.</p>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <p className="text-[14.5px] text-a-muted">
                {usedIn.length ? `Está asignada a ${usedIn.join(", ")}. Quítala de Semana para poder eliminarla.` : "Se elimina de la base de datos. No se puede deshacer."}
              </p>
              <ConfirmButton
                label="Eliminar rutina"
                confirmLabel="Confirmar: eliminar"
                disabled={usedIn.length > 0 || deleting}
                onConfirm={() =>
                  startDelete(async () => {
                    const res = await deleteRoutine(r.key);
                    if (res.ok) router.replace("/admin/rutinas");
                    else setDeleteError(res.error);
                  })
                }
              />
              {deleteError && (
                <p role="alert" className="text-[14px] text-a-danger">
                  {deleteError}
                </p>
              )}
            </div>
          )}
        </Panel>
      )}

      <SaveBar dirty={dirty} pending={pending} status={status} onSave={submit} onDiscard={discard} label={isNew ? "Crear rutina" : "Guardar cambios"} />
    </div>
  );
}
