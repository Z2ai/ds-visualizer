"use client";

import { useState } from "react";
import StackVisualizer from "@/components/visualizers/StackVisualizer";
import CodePanel from "@/components/CodePanel";
import { stackSnippets } from "@/lib/codeSnippets";

const MAX_ALLOWED_SIZE = 15;
let idCounter = 0;

export default function StackPage() {
  const [size, setSize] = useState(null);
  const [sizeInput, setSizeInput] = useState("");
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");
  const [activeCode, setActiveCode] = useState(stackSnippets.declare);
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
    setStack([]);
    setError("");
    setActiveCode(stackSnippets.declare);
    setActiveTitle("Declaration");
  }

  function handlePush() {
    setActiveCode(stackSnippets.push);
    setActiveTitle("PushStack()");

    const num = Number(value);
    if (value === "" || Number.isNaN(num)) {
      setError("Enter a valid numeric value.");
      return;
    }
    if (stack.length === size) {
      setError("Sorry, The stack is already Full!");
      return;
    }

    setStack([...stack, { id: idCounter++, val: num }]);
    setError("");
    setValue("");
  }

  function handlePop() {
    setActiveCode(stackSnippets.pop);
    setActiveTitle("PopStack()");

    if (stack.length === 0) {
      setError("Sorry, The stack is empty!");
      return;
    }

    setStack(stack.slice(0, -1));
    setError("");
  }

  return (
    <div className="p-8 max-w-6xl">
      <h2 className="text-2xl font-semibold mb-1">Stack</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        LIFO — Last In, First Out.
      </p>

      {size === null ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] max-w-md space-y-3">
          <label className="text-sm font-medium text-[var(--color-text)]">
            Choose the stack size
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
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] flex flex-col items-center gap-4">
              <StackVisualizer stack={stack} size={size} />
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
                placeholder="Value to push"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              />

              <div className="flex gap-3">
                <button
                  onClick={handlePush}
                  className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Push
                </button>
                <button
                  onClick={handlePop}
                  className="flex-1 border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
                >
                  Pop
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