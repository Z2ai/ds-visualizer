"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function ArrayVisualizer({ array }) {
  return (
    <div className="flex flex-wrap gap-3 items-end min-h-[100px]">
      <AnimatePresence mode="popLayout">
        {array.map((value, index) => (
          <motion.div
            key={value.id}
            layout
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-lg border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary-dark)] font-semibold text-lg">
              {value.val}
            </div>
            <span className="text-xs text-[var(--color-text-muted)] mt-1">
              [{index}]
            </span>
          </motion.div>
        ))}
      </AnimatePresence>

      {array.length === 0 && (
        <p className="text-sm text-[var(--color-text-muted)]">
          Array is empty — insert a value to begin.
        </p>
      )}
    </div>
  );
}