"use client";

import { useState } from "react";
import CircularQueueVisualizer from "@/components/visualizers/CircularQueueVisualizer";
import CodePanel from "@/components/CodePanel";
import { circularQueueSnippets } from "@/lib/codeSnippets";

const MAX_ALLOWED_SIZE = 10;
let idCounter = 0;

export default function CircularQueuePage() {
  const [size, setSize] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [slots, setSlots] = useState([]);
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [value, setValue] = useState("");
  const [activeCode, setActiveCode] = useState(circularQueueSnippets.declare);
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
    setActiveCode(circularQueueSnippets.declare);
    setActiveTitle("Declaration");
  }

  function handleInsert() {
    setActiveCode(circularQueueSnippets.insert);
    setActiveTitle("InsertCqueue()");

    const num = Number(value);
    if (value === "" || Number.isNaN(num)) {
      setError("Enter a valid numeric value.");
      return;
    }

    if ((rear === size - 1 && front === 0) || front === rear + 1) {
      setError("Circular Queue is Full!");
      return;
    }

    const newSlots = [...slots];
    let newRear;

    if (front > 0 && rear === size - 1) {
      newRear = 0;
    } else {
      newRear = rear + 1;
    }

    newSlots[newRear] = { id: idCounter++, val: num };
    setSlots(newSlots);
    setRear(newRear);
    if (front === -1) setFront(0);

    setError("");
    setValue("");
  }

  function handleDelete() {
    setActiveCode(circularQueueSnippets.delete);
    setActiveTitle("DeleteCqueue()");

    if (front === -1) {
      setError("Circular Queue is Empty");
      return;
    }

    const newSlots = [...slots];
    newSlots[front] = null;

    if (front === rear) {
      setSlots(newSlots);
      setFront(-1);
      setRear(-1);
    } else if (front === size - 1) {
      setSlots(newSlots);
      setFront(0);
    } else {
      setSlots(newSlots);
      setFront(front + 1);
    }

    setError("");
  }

  return (
    <div className="p-8 max-w-6xl">
      <h2 className="text-2xl font-semibold mb-1">Circular Queue</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Front and Rear wrap around to slot 0 once they reach the end.
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] flex flex-col items-center gap-4">
              <CircularQueueVisualizer slots={slots} front={front} rear={rear} />
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