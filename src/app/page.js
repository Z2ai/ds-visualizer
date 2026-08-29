export default function Home() {
  return (
    <div className="p-10 max-w-2xl">
      <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-3">
        Data Structures Visualization
      </h2>
      <p className="text-[var(--color-text-muted)] leading-relaxed">
        Select a data structure from the sidebar to explore how it works —
        insert or delete elements and watch the structure update visually,
        alongside the exact C++ code behind each operation.
      </p>
    </div>
  );
}