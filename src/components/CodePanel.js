"use client";

export default function CodePanel({ title, code }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <span className="text-xs font-medium text-[var(--color-text-muted)]">
          {title || "C++ Code"}
        </span>
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-[var(--color-text)] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}