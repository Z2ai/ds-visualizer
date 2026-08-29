"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function StackVisualizer({ stack, size }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col-reverse gap-2 border-2 border-[var(--color-border)] rounded-lg p-3 w-40 min-h-[280px] justify-start bg-[var(--color-bg)]">
        <AnimatePresence mode="popLayout">
          {stack.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.22 }}
              className="relative h-11 rounded-md border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary-dark)] font-semibold"
            >
              {item.val}
              {index === stack.length - 1 && (
                <span className="absolute -right-14 text-xs font-medium text-[var(--color-primary-dark)]">
                  ← top
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mt-2">
        {stack.length} / {size}
      </p>
    </div>
  );
}