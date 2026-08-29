"use client";

import { useState } from "react";
import ArrayVisualizer from "@/components/visualizers/ArrayVisualizer";
import CodePanel from "@/components/CodePanel";
import { arraySnippets } from "@/lib/codeSnippets";

const MAX_ALLOWED_SIZE = 15;
let idCounter = 0;

export default function ArrayPage() {
  const [size, setSize] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [array, setArray] = useState([]);
  const [value, setValue] = useState("");
  const [pos, setPos] = useState("");
  const [activeCode, setActiveCode] = useState(arraySnippets.declare);
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
    setError("");
  }

  function handleReset() {
    setSize(null);
    setSizeInput("");
    setArray([]);
    setError("");
    setActiveCode(arraySnippets.declare);
    setActiveTitle("Declaration");
  }

  function handleInsert() {
    setActiveCode(arraySnippets.insert);
    setActiveTitle("InsertAt()");

    const num = Number(value);
    const index = pos === "" ? array.length : Number(pos);

    if (value === "" || Number.isNaN(num)) {
      setError("Enter a valid numeric value.");
      return;
    }
    if (index < 0 || index > array.length) {
      setError("Position out of range.");
      return;
    }
    if (array.length >= size) {
      setError("Sorry, The array is already Full!");
      return;
    }

    const newArr = [...array];
    newArr.splice(index, 0, { id: idCounter++, val: num });
    setArray(newArr);
    setError("");
    setValue("");
    setPos("");
  }

  function handleDelete() {
    setActiveCode(arraySnippets.delete);
    setActiveTitle("DeleteAt()");

    const index = pos === "" ? array.length - 1 : Number(pos);

    if (array.length === 0) {
      setError("Array is empty.");
      return;
    }
    if (index < 0 || index >= array.length) {
      setError("Position out of range.");
      return;
    }

    const newArr = [...array];
    newArr.splice(index, 1);
    setArray(newArr);
    setError("");
    setPos("");
  }

  return (
    <div className="p-8 max-w-6xl">
      <h2 className="text-2xl font-semibold mb-1">Array</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Fixed size, chosen by you.
      </p>

      {size === null ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] max-w-md space-y-3">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Choose the array size
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder={`e.g. 6 (max ${MAX_ALLOWED_SIZE})`}
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
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] space-y-3">
              <ArrayVisualizer array={array} />
              <button
                onClick={handleReset}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] underline"
              >
                Change size / Reset
              </button>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
                <input
                  type="number"
                  placeholder={`Index (0-${array.length})`}
                  value={pos}
                  onChange={(e) => setPos(e.target.value)}
                  className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
                />
              </div>

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