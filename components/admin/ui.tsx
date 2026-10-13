"use client";

import { useCallback, useEffect, useId, useState, useTransition, type ComponentProps, type ReactNode } from "react";
import { Alert, Check, ChevronDown, ChevronUp, Plus, Trash, Undo } from "./icons";
import type { ActionResult } from "@/app/admin/actions";
import type { TagColor } from "@/lib/types";

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

export const inputCls =
  "block w-full min-h-11 rounded-lg border border-a-line bg-a-well px-3 py-2 text-[15px] text-a-ink placeholder:text-a-muted/70 transition-colors hover:border-a-muted/60 focus:border-a-accent focus:bg-a-surface disabled:opacity-60";

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx("flex flex-col gap-1.5 min-w-0", className)}>
      <label className="flex flex-col gap-1.5">
        <span className="text-[13px] font-medium text-a-muted">{label}</span>
        {children}
      </label>
      {hint && <span className="text-[12.5px] text-a-muted">{hint}</span>}
    </div>
  );
}

export function TextInput(props: ComponentProps<"input">) {
  return <input {...props} className={cx(inputCls, props.className)} />;
}

export function TextArea({ rows = 3, ...props }: ComponentProps<"textarea">) {
  return <textarea rows={rows} {...props} className={cx(inputCls, "resize-y leading-relaxed", props.className)} />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={cx(inputCls, "pr-8", props.className)} />;
}

const btnBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

export function Button({ variant = "secondary", className, ...props }: ComponentProps<"button"> & { variant?: "primary" | "secondary" | "danger" }) {
  const styles = {
    primary: "bg-a-accent text-a-on-accent hover:brightness-110 active:brightness-95",
    secondary: "border border-a-line bg-a-surface text-a-ink hover:border-a-muted/60 hover:bg-a-well",
    danger: "bg-a-danger text-a-on-accent hover:brightness-110",
  };
  return <button type="button" {...props} className={cx(btnBase, styles[variant], className)} />;
}

export function IconButton({ label, children, className, ...props }: ComponentProps<"button"> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...props}
      className={cx(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-a-muted transition-colors hover:bg-a-well hover:text-a-ink disabled:pointer-events-none disabled:opacity-30 md:size-9",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Subir / bajar / (extra) para filas de una lista editable. */
export function RowTools({ index, count, onMove, children }: { index: number; count: number; onMove: (to: number) => void; children?: ReactNode }) {
  return (
    <div className="flex items-center">
      <IconButton label="Mover arriba" disabled={index === 0} onClick={() => onMove(index - 1)}>
        <ChevronUp />
      </IconButton>
      <IconButton label="Mover abajo" disabled={index === count - 1} onClick={() => onMove(index + 1)}>
        <ChevronDown />
      </IconButton>
      {children}
    </div>
  );
}

const COLOR_NAMES: Record<TagColor, string> = { ember: "Naranja", moss: "Verde", sky: "Azul" };
const SWATCH: Record<TagColor, string> = {
  ember: "bg-[#BF4A2A] dark:bg-[#F0906A]",
  moss: "bg-[#1F7A6B] dark:bg-[#6FCDB9]",
  sky: "bg-[#2F5FB3] dark:bg-[#8DB4F0]",
};

export function ColorPicker({ value, onChange, label = "Color" }: { value: TagColor; onChange: (c: TagColor) => void; label?: string }) {
  const group = useId();
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 text-[13px] font-medium text-a-muted">{label}</legend>
      <div className="flex gap-2">
        {(Object.keys(COLOR_NAMES) as TagColor[]).map((c) => (
          <label
            key={c}
            className={cx(
              "flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-2.5 text-[14px] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-a-accent",
              value === c ? "border-a-accent bg-a-accent-soft text-a-ink" : "border-a-line bg-a-well text-a-muted hover:border-a-muted/60",
            )}
          >
            <input type="radio" className="sr-only" checked={value === c} onChange={() => onChange(c)} name={group} />
            <span className={cx("size-3 rounded-full", SWATCH[c])} />
            {COLOR_NAMES[c]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Panel({ title, description, children, action }: { title?: string; description?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-a-line bg-a-surface">
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-a-line px-4 py-3.5 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-[16px] font-semibold text-a-ink">{title}</h2>
            {description && <p className="mt-0.5 text-[13.5px] text-a-muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function PageHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <h1 className="font-display text-[28px] font-semibold leading-tight text-a-ink [text-wrap:balance]">{title}</h1>
      {children}
    </div>
  );
}

/** Estado de edición: detecta cambios, guarda con una server action y avisa antes de salir con cambios pendientes. */
export function useEditor<T>(initial: T, save: (value: T) => Promise<ActionResult>, onSaved?: (r: Extract<ActionResult, { ok: true }>) => void) {
  const [value, setValue] = useState(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [pending, start] = useTransition();
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const dirty = JSON.stringify(value) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const submit = useCallback(() => {
    setStatus(null);
    start(async () => {
      const r = await save(value);
      if (r.ok) {
        setSaved(JSON.stringify(value));
        setStatus({ kind: "ok", text: r.message ?? "Guardado" });
        onSaved?.(r);
      } else {
        setStatus({ kind: "error", text: r.error });
      }
    });
  }, [save, value, onSaved]);

  const discard = useCallback(() => {
    setValue(JSON.parse(saved) as T);
    setStatus(null);
  }, [saved]);

  return { value, setValue, dirty, pending, status, submit, discard };
}

export function SaveBar({ dirty, pending, status, onSave, onDiscard, label = "Guardar cambios" }: {
  dirty: boolean;
  pending: boolean;
  status: { kind: "ok" | "error"; text: string } | null;
  onSave: () => void;
  onDiscard: () => void;
  label?: string;
}) {
  const error = status?.kind === "error";
  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-a-line bg-a-bg/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] pt-3 backdrop-blur sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-xl lg:border lg:px-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p role={error ? "alert" : "status"} aria-live="polite" className={cx("flex min-w-0 flex-1 basis-48 items-center gap-2 text-[14px]", error ? "text-a-danger" : dirty ? "text-a-ink" : "text-a-muted")}>
          {error ? <Alert className="size-4 shrink-0" /> : !dirty && status ? <Check className="size-4 shrink-0 text-a-ok" /> : null}
          <span className="min-w-0 [text-wrap:pretty]">{error ? status.text : dirty ? "Tienes cambios sin guardar" : status ? status.text : "Todo guardado"}</span>
        </p>
        <div className="flex gap-2">
          <Button onClick={onDiscard} disabled={!dirty || pending}>
            <Undo className="size-4" />
            Descartar
          </Button>
          <Button variant="primary" onClick={onSave} disabled={!dirty || pending}>
            {pending ? "Guardando…" : label}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Botón destructivo en dos pasos, sin modal: el primer toque lo arma, el segundo confirma. */
export function ConfirmButton({ label, confirmLabel, onConfirm, disabled, icon = true }: { label: string; confirmLabel: string; onConfirm: () => void; disabled?: boolean; icon?: boolean }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  return (
    <Button
      variant={armed ? "danger" : "secondary"}
      disabled={disabled}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else setArmed(true);
      }}
      className={armed ? "" : "text-a-danger"}
    >
      {icon && <Trash className="size-4" />}
      {armed ? confirmLabel : label}
    </Button>
  );
}

/** Lista de textos (una línea o párrafo por elemento) con alta, baja y orden. */
export function StringList({ items, onChange, addLabel, rows = 2 }: { items: string[]; onChange: (items: string[]) => void; addLabel: string; rows?: number }) {
  const move = (from: number, to: number) => {
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-3">
      {items.map((t, i) => (
        <div key={i} className="flex items-start gap-1">
          <TextArea aria-label={`Elemento ${i + 1}`} rows={rows} value={t} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
          <div className="flex flex-col md:flex-row">
            <RowTools index={i} count={items.length} onMove={(to) => move(i, to)}>
              <IconButton label="Quitar" onClick={() => onChange(items.filter((_, j) => j !== i))}>
                <Trash />
              </IconButton>
            </RowTools>
          </div>
        </div>
      ))}
      <Button className="self-start" onClick={() => onChange([...items, ""])}>
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  );
}

/** Lista de pares título/texto. */
export function BulletList({ items, onChange, addLabel }: { items: { k: string; v: string }[]; onChange: (items: { k: string; v: string }[]) => void; addLabel: string }) {
  const move = (from: number, to: number) => {
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    onChange(next);
  };
  const set = (i: number, patch: Partial<{ k: string; v: string }>) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  return (
    <div className="flex flex-col gap-3">
      {items.map((b, i) => (
        <div key={i} className="flex items-start gap-1 rounded-xl border border-a-line p-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <TextInput aria-label="Título" placeholder="Título" value={b.k} onChange={(e) => set(i, { k: e.target.value })} className="font-medium" />
            <TextArea aria-label="Texto" placeholder="Texto" rows={2} value={b.v} onChange={(e) => set(i, { v: e.target.value })} />
          </div>
          <div className="flex flex-col">
            <RowTools index={i} count={items.length} onMove={(to) => move(i, to)} />
            <IconButton label="Quitar" onClick={() => onChange(items.filter((_, j) => j !== i))}>
              <Trash />
            </IconButton>
          </div>
        </div>
      ))}
      <Button className="self-start" onClick={() => onChange([...items, { k: "", v: "" }])}>
        <Plus className="size-4" />
        {addLabel}
      </Button>
    </div>
  );
}
