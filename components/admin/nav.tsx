"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Cog, Dumbbell, TextIcon } from "./icons";
import { cx } from "./ui";

const items = [
  { href: "/admin/semana", label: "Semana", Icon: Calendar },
  { href: "/admin/rutinas", label: "Rutinas", Icon: Dumbbell },
  { href: "/admin/textos", label: "Textos", Icon: TextIcon },
  { href: "/admin/ajustes", label: "Ajustes", Icon: Cog },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Secciones del CMS" className="grid grid-cols-4 gap-1 lg:grid-cols-1">
      {items.map(({ href, label, Icon }) => {
        const active = path === href || path.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cx(
              "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg px-2 text-[12.5px] font-medium transition-colors lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:text-[15px]",
              active ? "bg-a-accent-soft text-a-accent" : "text-a-muted hover:bg-a-well hover:text-a-ink",
            )}
          >
            <Icon className="size-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
