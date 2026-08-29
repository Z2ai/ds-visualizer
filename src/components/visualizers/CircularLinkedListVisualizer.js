"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function CircularLinkedListVisualizer({ nodes }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1 flex-wrap justify-center min-h-[100px]">
        <AnimatePresence mode="popLayout">
          {nodes.map((node, index) => (
            <motion.div
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.22 }}
              className="flex items-center"
            >
              <div className="flex flex-col items-center">
                {index === 0 && (
                  <span className="text-[10px] font-medium text-[var(--color-primary-dark)] mb-1">
                    Head
                  </span>
                )}
                <div className="flex border-2 border-[var(--color-primary)] rounded-md overflow-hidden">
                  <div className="w-11 h-11 bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary-dark)] font-semibold">
                    {node.val}
                  </div>
                  <div className="w-5 h-11 bg-[var(--color-surface)] flex items-center justify-center border-l-2 border-[var(--color-primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  </div>
                </div>
                {index === nodes.length - 1 && (
                  <span className="text-[10px] font-medium text-[var(--color-primary-dark)] mt-1">
                    Last
                  </span>
                )}
              </div>
              {index < nodes.length - 1 && (
                <span className="mx-1.5 text-[var(--color-primary)] text-lg">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {nodes.length === 0 && (
          <p className="text-sm text-[var(--color-text-muted)]">
            List is empty — insert a value to begin.
          </p>
        )}
      </div>

      {nodes.length > 0 && (
        <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
          <span className="text-[var(--color-primary)]">↺</span>
          Last points back to Head (circular)
        </p>
      )}
    </div>
  );
}