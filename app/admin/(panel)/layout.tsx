import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";
import { AdminNav } from "@/components/admin/nav";
import { External, LogOut } from "@/components/admin/icons";

export const metadata: Metadata = { title: "CMS · Bitácora de Hierro", robots: { index: false } };

const linkCls =
  "inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-[14px] text-a-muted transition-colors hover:bg-a-well hover:text-a-ink";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="admin min-h-screen bg-a-bg font-sans text-a-ink lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-a-line bg-a-surface px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:border-r lg:px-3 lg:py-5">
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:px-3">
          <Link href="/admin" className="font-display text-[19px] font-semibold tracking-[0.01em]">
            Bitácora <span className="text-a-accent">CMS</span>
          </Link>
          <div className="flex items-center lg:hidden">
            <Link href="/" target="_blank" className={linkCls} aria-label="Ver página pública">
              <External className="size-4" />
            </Link>
            <form action={logout}>
              <button type="submit" className={linkCls} aria-label="Cerrar sesión">
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
        <AdminNav />
        <div className="mt-auto hidden flex-col gap-1 border-t border-a-line pt-3 lg:flex">
          <Link href="/" target="_blank" className={linkCls}>
            <External className="size-4" />
            Ver página pública
          </Link>
          <form action={logout}>
            <button type="submit" className={`${linkCls} w-full`}>
              <LogOut className="size-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 px-4 pb-8 pt-6 sm:px-6 lg:px-10 lg:pt-9">
        <div className="mx-auto w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
