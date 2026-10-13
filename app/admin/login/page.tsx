import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Acceso · CMS", robots: { index: false } };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="admin grid min-h-screen place-items-center bg-a-bg px-4 font-sans text-a-ink">
      <main className="w-full max-w-sm">
        <h1 className="font-display text-[32px] font-semibold leading-tight">
          Bitácora <span className="text-a-accent">CMS</span>
        </h1>
        <p className="mt-1 mb-6 text-[15px] text-a-muted">Entra para editar tu programa.</p>
        <LoginForm />
      </main>
    </div>
  );
}
