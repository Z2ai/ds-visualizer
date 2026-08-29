"use client";

import { useState } from "react";
import LinkedListVisualizer from "@/components/visualizers/LinkedListVisualizer";
import CodePanel from "@/components/CodePanel";
import { linkedListSnippets } from "@/lib/codeSnippets";

const MAX_NODES = 12;
let idCounter = 0;

export default function LinkedListPage() {
  const [nodes, setNodes] = useState([]);
  const [value, setValue] = useState("");
  const [pos, setPos] = useState("");
  const [activeCode, setActiveCode] = useState(linkedListSnippets.declare);
  const [activeTitle, setActiveTitle] = useState("Declaration");
  const [error, setError] = useState("");

  function showCode(codeKey, title) {
    setActiveCode(linkedListSnippets[codeKey]);
    setActiveTitle(title);
  }

  function validateValue() {
    const num = Number(value);
    if (value === "" || Number.isNaN(num)) {
      setError("Enter a valid numeric value.");
      return null;
    }
    if (nodes.length >= MAX_NODES) {
      setError(`Max ${MAX_NODES} nodes for a clear visualization.`);
      return null;
    }
    return num;
  }

  function handleInsertStart() {
    showCode("insertStart", "InsertStart()");
    const num = validateValue();
    if (num === null) return;
    setNodes([{ id: idCounter++, val: num }, ...nodes]);
    setError("");
    setValue("");
  }

  function handleInsertEnd() {
    showCode("insertEnd", "InsertEnd()");
    const num = validateValue();
    if (num === null) return;
    setNodes([...nodes, { id: idCounter++, val: num }]);
    setError("");
    setValue("");
  }

  function handleInsertPos() {
    showCode("insertPos", "InsertPos()");
    const num = validateValue();
    if (num === null) return;

    const index = Number(pos);
    if (pos === "" || !Number.isInteger(index) || index < 0 || index > nodes.length) {
      setError("Out of Range");
      return;
    }

    const newNodes = [...nodes];
    newNodes.splice(index, 0, { id: idCounter++, val: num });
    setNodes(newNodes);
    setError("");
    setValue("");
    setPos("");
  }

  function handleDeleteStart() {
    showCode("deleteStart", "DeleteStart()");
    if (nodes.length === 0) {
      setError("List is empty!");
      return;
    }
    setNodes(nodes.slice(1));
    setError("");
  }

  function handleDeleteEnd() {
    showCode("deleteEnd", "DeleteEnd()");
    if (nodes.length === 0) {
      setError("List is empty!");
      return;
    }
    setNodes(nodes.slice(0, -1));
    setError("");
  }

  function handleDeletePos() {
    showCode("deletePos", "DeletePos()");

    const index = Number(pos);
    if (pos === "" || !Number.isInteger(index) || index < 0 || index >= nodes.length) {
      setError("Out of Range");
      return;
    }

    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
    setError("");
    setPos("");
  }

  return (
    <div className="p-8 max-w-6xl">
      <h2 className="text-2xl font-semibold mb-1">Linked List</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        Nodes connected by pointers — no fixed size.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 border-t-4 border-t-[var(--color-primary)] overflow-x-auto">
            <LinkedListVisualizer nodes={nodes} />
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
                placeholder={`Position (0-${nodes.length})`}
                value={pos}
                onChange={(e) => setPos(e.target.value)}
                className="w-full border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleInsertStart}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Insert Start
              </button>
              <button
                onClick={handleInsertEnd}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Insert End
              </button>
              <button
                onClick={handleDeleteStart}
                className="border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Delete Start
              </button>
              <button
                onClick={handleDeleteEnd}
                className="border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Delete End
              </button>
              <button
                onClick={handleInsertPos}
                className="col-span-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Insert at Position
              </button>
              <button
                onClick={handleDeletePos}
                className="col-span-2 border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Delete at Position
              </button>
            </div>

            {error && (
              <p className="text-sm text-[var(--color-danger)]">{error}</p>
            )}
          </div>
        </div>

        <CodePanel title={activeTitle} code={activeCode} />
      </div>
    </div>
  );
}