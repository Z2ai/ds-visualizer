"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Boxes, Layers, ListOrdered, RotateCcw, Link2, RefreshCw, Menu, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div
        className="md:hidden flex items-center justify-between px-4 py-3"
        style={{
          background: "var(--color-sidebar-bg)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-md" />
          <span className="text-sm font-semibold text-white">Data Structures</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-white p-2 -mr-2"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </div>

      {/* Spacer to push content below fixed bar */}
      <div className="md:hidden" style={{ height: 56 }} />

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40"
          style={{ zIndex: 90 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar (drawer on mobile, static on desktop) */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 md:w-64 shrink-0 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ background: "var(--color-sidebar-bg)", zIndex: 110 }}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white p-2"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[var(--color-primary)] text-white font-medium"
                    : "text-[var(--color-sidebar-text)] opacity-80 hover:opacity-100 hover:bg-white/5"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}