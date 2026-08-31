"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function QueueVisualizer({ slots, front, rear }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 border-2 border-[var(--color-border)] rounded-lg p-3 min-h-[80px] items-center bg-[var(--color-bg)] overflow-x-auto">
        {slots.map((slot, index) => (
          <div key={index} className="flex flex-col items-center gap-1 shrink-0">
            <div className="h-5 text-[10px] font-medium text-[var(--color-primary-dark)]">
              {index === front && index === rear && "Front/Rear"}
              {index === front && index !== rear && "Front"}
              {index === rear && index !== front && "Rear"}
            </div>
            <div className="w-12 h-12 rounded-md border-2 border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                {slot !== null && (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full rounded-md border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary-dark)] font-semibold"
                  >
                    {slot.val}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[10px] text-[var(--color-text-muted)]">
              [{index}]
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--color-text-muted)] self-center">
        {slots.filter((s) => s !== null).length} / {slots.length}
      </p>
    </div>
  );
}