"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Boxes, Layers, ListOrdered, RotateCcw, Link2, RefreshCw } from "lucide-react";

const items = [
  { href: "/array", label: "Array", icon: Boxes },
  { href: "/stack", label: "Stack", icon: Layers },
  { href: "/queue", label: "Queue", icon: ListOrdered },
  { href: "/circular-queue", label: "Circular Queue", icon: RotateCcw },
  { href: "/linked-list", label: "Linked List", icon: Link2 },
  { href: "/circular-linked-list", label: "Circular Linked List", icon: RefreshCw },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col" style={{ background: "var(--color-sidebar-bg)" }}>
      <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Data Structures Visualization logo"
          width={36}
          height={36}
          className="rounded-md"
        />
        <div>
          <h1 className="text-sm font-semibold text-white leading-tight">
            Data Structures
          </h1>
          <p className="text-xs text-[var(--color-sidebar-text)] opacity-70">
            Visualization
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-[var(--color-primary)] text-white font-medium"
                  : "text-[var(--color-sidebar-text)] opacity-80 hover:opacity-100 hover:bg-white/5"
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}