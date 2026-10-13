"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Field, TextInput } from "@/components/admin/ui";
import { Alert } from "@/components/admin/icons";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="flex flex-col gap-4 rounded-2xl border border-a-line bg-a-surface p-5">
      <Field label="Contraseña">
        <TextInput type="password" name="password" autoComplete="current-password" required autoFocus aria-invalid={!!state?.error} />
      </Field>
      {state?.error && (
        <p role="alert" className="flex items-center gap-2 text-[14px] text-a-danger">
          <Alert className="size-4 shrink-0" />
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-lg bg-a-accent px-4 text-[15px] font-medium text-a-on-accent transition-colors hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
