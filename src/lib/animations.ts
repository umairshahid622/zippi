import type { TargetAndTransition } from "motion";

export const floatingAnimation = (duration: number, delay: number): TargetAndTransition => ({
  opacity: 0.15,
  y: [0, -26, 0],
  rotate: [0, 12, 0],
  transition: {
    opacity: {
      duration: 1,
      delay: Math.abs(delay) * 0.2,
    },
    y: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
    rotate: {
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
