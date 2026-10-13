"use client";

import { saveWeek } from "../../actions";
import { Button, ColorPicker, Field, IconButton, RowTools, SaveBar, Select, TextInput, useEditor } from "@/components/admin/ui";
import { Plus, Trash } from "@/components/admin/icons";
import { Tag } from "@/components/tag";
import type { TagColor, WeekDay } from "@/lib/types";

type RoutineOption = { key: string; name: string; kind: string; tagLabel: string; tagColor: TagColor };

const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const SLOTS = ["Mañana", "Tarde", "Noche"];

export function WeekEditor({ initial, routines }: { initial: WeekDay[]; routines: RoutineOption[] }) {
  const { value: days, setValue, dirty, pending, status, submit, discard } = useEditor(initial, saveWeek);
  const byKey = new Map(routines.map((r) => [r.key, r]));

  const patch = (i: number, p: Partial<WeekDay>) => setValue(days.map((d, j) => (j === i ? { ...d, ...p } : d)));

  // Mover la sesión (todo salvo el nombre del día) intercambia contenido con la fila vecina.
  const swapSession = (from: number, to: number) => {
    const session = (d: WeekDay) => ({ slot: d.slot, routine: d.routine, tag: d.tag, color: d.color });
    setValue(
      days.map((d, j) => {
        if (j === from) return { ...d, ...session(days[to]) };
        if (j === to) return { ...d, ...session(days[from]) };
        return d;
      }),
    );
  };

  const changeRoutine = (i: number, key: string) => {
    const r = byKey.get(key);
    const d = days[i];
    patch(i, { routine: key, ...(r && !d.tag ? { tag: r.tagLabel, color: r.tagColor } : {}) });
  };

  const unusedDay = DAYS.find((n) => !days.some((d) => d.day === n)) ?? DAYS[0];
  const first = routines[0];

  return (
    <>
      <ol className="flex flex-col gap-3">
        {days.map((d, i) => {
          const routine = byKey.get(d.routine);
          return (
            <li key={i} className="rounded-2xl border border-a-line bg-a-surface p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Select aria-label="Día" value={d.day} onChange={(e) => patch(i, { day: e.target.value })} className="w-36 font-semibold sm:w-40">
                    {DAYS.map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </Select>
                  {routine && (
                    <span className="hidden sm:inline-block">
                      <Tag label={routine.name} color={d.color} />
                    </span>
                  )}
                </div>
                <RowTools index={i} count={days.length} onMove={(to) => swapSession(i, to)}>
                  <IconButton label={`Quitar ${d.day}`} disabled={days.length === 1} onClick={() => setValue(days.filter((_, j) => j !== i).map((x, o) => ({ ...x, order: o })))}>
                    <Trash />
                  </IconButton>
                </RowTools>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field label="Sesión">
                  <Select value={d.routine} onChange={(e) => changeRoutine(i, e.target.value)}>
                    {routines.map((r) => (
                      <option key={r.key} value={r.key}>
                        {r.name}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Franja">
                  <Select value={d.slot} onChange={(e) => patch(i, { slot: e.target.value })}>
                    {[...new Set([...SLOTS, d.slot])].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Foco" hint="Lo que ves en la columna “Foco” de la tabla.">
                  <TextInput value={d.tag} onChange={(e) => patch(i, { tag: e.target.value })} placeholder="Ej. Pecho/Hombro" />
                </Field>
                <ColorPicker value={d.color} onChange={(color) => patch(i, { color })} label="Color del foco" />
              </div>
            </li>
          );
        })}
      </ol>

      <Button
        className="mt-3"
        onClick={() =>
          setValue([...days, { order: days.length, day: unusedDay, slot: "Mañana", routine: first.key, tag: first.tagLabel, color: first.tagColor }])
        }
      >
        <Plus className="size-4" />
        Agregar día
      </Button>

      <SaveBar dirty={dirty} pending={pending} status={status} onSave={submit} onDiscard={discard} />
    </>
  );
}
