"use client";

import { useState } from "react";
import QueueVisualizer from "@/components/visualizers/QueueVisualizer";
import CodePanel from "@/components/CodePanel";
import { queueSnippets } from "@/lib/codeSnippets";

const MAX_ALLOWED_SIZE = 10;
let idCounter = 0;

export default function QueuePage() {
  const [size, setSize] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [slots, setSlots] = useState([]);
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [value, setValue] = useState("");
  const [activeCode, setActiveCode] = useState(queueSnippets.declare);
  const [activeTitle, setActiveTitle] = useState("Declaration");
  const [error, setError] = useState("");

  function handleSetSize() {
    const num = Number(sizeInput);
    if (!Number.isInteger(num) || num <= 0) {
      setError("Enter a valid positive integer for size.");
      return;
    }
    if (num > MAX_ALLOWED_SIZE) {
      setError(`Please choose a size up to ${MAX_ALLOWED_SIZE}.`);
      return;
    }
    setSize(num);
    setSlots(Array(num).fill(null));
    setFront(-1);
    setRear(-1);
    setError("");
  }

  function handleReset() {
    setSize(null);
    setSizeInput("");
    setSlots([]);
    setFront(-1);
    setRear(-1);
    setError("");
    setActiveCode(queueSnippets.declare);
    setActiveTitle("Declaration");
  }

  function handleInsert() {
    setActiveCode(queueSnippets.insert);
    setActiveTitle("InsertQueue()");

    const num = Number(value);
    if (value === "" || Number.isNaN(num)) {
      setError("Enter a valid numeric value.");
      return;
    }

    // Matches original logic exactly: full only when Rear == Size - 1
    if (rear === size - 1) {
      setError("Sorry, Queue is Full!");
      return;
    }

    const newSlots = [...slots];
    const newRear = rear + 1;
    newSlots[newRear] = { id: idCounter++, val: num };
    setSlots(newSlots);
    setRear(newRear);
    if (front === -1) setFront(0);

    setError("");
    setValue("");
  }

  function handleDelete() {
    setActiveCode(queueSnippets.delete);
    setActiveTitle("DeleteQueue()");

    if (front === -1) {
      setError("Sorry, Queue is empty!");
      return;
    }

    const newSlots = [...slots];
    newSlots[front] = null;
    setSlots(newSlots);

    if (front === rear) {
      setFront(-1);
      setRear(-1);
    } else {
      setFront(front + 1);
    }

    setError("");
  }

  return (
    <div className="p-8 max-w-6xl">
      <h2 className="text-2xl font-semibold mb-1">Queue</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        FIFO — Linear queue. Once Rear reaches the last slot, it&apos;s full
        even if earlier slots were freed (this is exactly why Circular Queue exists).
      </p>

      {size === null ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] max-w-md space-y-3">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Choose the queue size
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder={`e.g. 5 (max ${MAX_ALLOWED_SIZE})`}
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
            />
            <button
              onClick={handleSetSize}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium px-5 rounded-lg transition-colors"
            >
              Create
            </button>
          </div>
          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] flex flex-col items-center gap-4 overflow-x-auto">
              <QueueVisualizer slots={slots} front={front} rear={rear} />
              <button
                onClick={handleReset}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] underline"
              >
                Change size / Reset
              </button>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
              <input
                type="number"
                placeholder="Value to insert"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              />

              <div className="flex gap-3">
                <button
                  onClick={handleInsert}
                  className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Insert
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>

              {error && (
                <p className="text-sm text-[var(--color-danger)]">{error}</p>
              )}
            </div>
          </div>

          <CodePanel title={activeTitle} code={activeCode} />
        </div>
      )}
    </div>
  );
}