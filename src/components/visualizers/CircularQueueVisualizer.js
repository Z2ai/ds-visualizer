"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function CircularQueueVisualizer({ slots, front, rear }) {
  const size = slots.length;
    const radius = 75;
  const center = 100;

  return (
        <div className="relative mx-auto" style={{ width: 200, height: 200, maxWidth: "100%" }}>
      {slots.map((slot, index) => {
        const angle = (index / size) * 2 * Math.PI - Math.PI / 2;
        const x = center + radius * Math.cos(angle) - 24;
        const y = center + radius * Math.sin(angle) - 24;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center"
            style={{ left: x, top: y }}
          >
            <div className="h-4 text-[9px] font-medium text-[var(--color-primary-dark)] whitespace-nowrap">
              {index === front && index === rear && "F/R"}
              {index === front && index !== rear && "F"}
              {index === rear && index !== front && "R"}
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                {slot !== null && (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--color-primary-dark)] font-semibold text-sm"
                  >
                    {slot.val}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[9px] text-[var(--color-text-muted)] mt-0.5">
              [{index}]
            </span>
          </div>
        );
      })}
    </div>
  );
}