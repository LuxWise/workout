"use client";

import type { ReactNode } from "react";
import { saveContent } from "../../actions";
import { BulletList, Field, SaveBar, StringList, TextArea, TextInput, useEditor } from "@/components/admin/ui";
import { ChevronDown } from "@/components/admin/icons";
import type { ActiveCard, SiteContent } from "@/lib/types";

function Group({ title, hint, children, open }: { title: string; hint?: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group rounded-2xl border border-a-line bg-a-surface">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 sm:px-5 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-[16px] font-semibold text-a-ink">{title}</span>
          {hint && <span className="block text-[13.5px] text-a-muted">{hint}</span>}
        </span>
        <ChevronDown className="size-5 shrink-0 text-a-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-4 border-t border-a-line p-4 sm:p-5">{children}</div>
    </details>
  );
}

export function ContentEditor({ initial }: { initial: SiteContent }) {
  const { value: c, setValue, dirty, pending, status, submit, discard } = useEditor(initial, saveContent);

  const patch = <K extends keyof SiteContent>(k: K, v: Partial<SiteContent[K]> | SiteContent[K]) =>
    setValue({ ...c, [k]: typeof v === "object" && v !== null && !Array.isArray(v) ? { ...(c[k] as object), ...v } : v });

  const activeCard = (key: "mobility" | "pool", title: string) => (
    <div className="flex flex-col gap-4 rounded-xl border border-a-line p-3 sm:p-4">
      <h3 className="text-[15px] font-semibold text-a-ink">{title}</h3>
      <Field label="Descripción">
        <TextArea value={c.active[key].body} onChange={(e) => patch("active", { [key]: { ...c.active[key], body: e.target.value } })} />
      </Field>
      <BulletList
        items={c.active[key].bullets}
        addLabel="Agregar punto"
        onChange={(bullets) => patch("active", { [key]: { ...c.active[key], bullets } as ActiveCard })}
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <Group title="Encabezado" hint="Lo primero que se ve en la página" open>
        <Field label="Línea superior">
          <TextInput value={c.header.eyebrow} onChange={(e) => patch("header", { eyebrow: e.target.value })} />
        </Field>
        <Field label="Título">
          <TextInput value={c.header.title} onChange={(e) => patch("header", { title: e.target.value })} />
        </Field>
        <Field label="Introducción">
          <TextArea rows={4} value={c.header.intro} onChange={(e) => patch("header", { intro: e.target.value })} />
        </Field>
      </Group>

      <Group title="Resumen" hint="Fase de adaptación, calentamiento y nota de la semana">
        <Field label="Fase de adaptación: título">
          <TextInput value={c.adaptation.label} onChange={(e) => patch("adaptation", { label: e.target.value })} />
        </Field>
        <Field label="Fase de adaptación: texto">
          <TextArea rows={5} value={c.adaptation.body} onChange={(e) => patch("adaptation", { body: e.target.value })} />
        </Field>
        <Field label="Calentamiento: título">
          <TextInput value={c.warmup.label} onChange={(e) => patch("warmup", { label: e.target.value })} />
        </Field>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-a-muted">Calentamiento: pasos</p>
          <StringList items={c.warmup.steps} addLabel="Agregar paso" onChange={(steps) => patch("warmup", { steps })} />
        </div>
        <Field label="Nota bajo la tabla de la semana" hint="{dias} se reemplaza por los días de fuerza y {n} por cuántos son.">
          <TextArea value={c.weekNote} onChange={(e) => patch("weekNote", e.target.value)} />
        </Field>
      </Group>

      <Group title="Movilidad y natación" hint="Tarjetas de los días sin pesas">
        <Field label="Introducción">
          <TextArea value={c.active.intro} onChange={(e) => patch("active", { intro: e.target.value })} />
        </Field>
        {activeCard("mobility", "Movilidad")}
        {activeCard("pool", "Natación")}
      </Group>

      <Group title="Reglas del programa" hint="Aviso de adaptación, reglas, límites y nutrición">
        <Field label="Aviso de adaptación: título">
          <TextInput value={c.rules.adaptationTitle} onChange={(e) => patch("rules", { adaptationTitle: e.target.value })} />
        </Field>
        <Field label="Aviso de adaptación: texto">
          <TextArea rows={4} value={c.rules.adaptationBody} onChange={(e) => patch("rules", { adaptationBody: e.target.value })} />
        </Field>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-a-muted">Reglas (admiten **negrita**, {"{dias}"} y {"{n}"})</p>
          <BulletList items={c.rules.items} addLabel="Agregar regla" onChange={(items) => patch("rules", { items })} />
        </div>
        <Field label="Límites: título">
          <TextInput value={c.rules.limitsTitle} onChange={(e) => patch("rules", { limitsTitle: e.target.value })} />
        </Field>
        <div>
          <p className="mb-1.5 text-[13px] font-medium text-a-muted">Límites y precauciones</p>
          <StringList items={c.rules.limits} rows={3} addLabel="Agregar límite" onChange={(limits) => patch("rules", { limits })} />
        </div>
        <Field label="Nutrición: título">
          <TextInput value={c.rules.nutritionTitle} onChange={(e) => patch("rules", { nutritionTitle: e.target.value })} />
        </Field>
        <Field label="Nutrición: texto">
          <TextArea rows={4} value={c.rules.nutritionBody} onChange={(e) => patch("rules", { nutritionBody: e.target.value })} />
        </Field>
      </Group>

      <Group title="Pie de página">
        <Field label="Texto">
          <TextArea value={c.footer} onChange={(e) => patch("footer", e.target.value)} />
        </Field>
      </Group>

      <SaveBar dirty={dirty} pending={pending} status={status} onSave={submit} onDiscard={discard} />
    </div>
  );
}
