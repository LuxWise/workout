import { Fragment } from "react";

/** Renderiza texto plano con **negrita**. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Reemplaza {dias} y {n} en textos editables. */
export const fillTokens = (text: string, dias: string, n: number) =>
  text.replaceAll("{dias}", dias).replaceAll("{n}", String(n));
