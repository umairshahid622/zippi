import type { Transition, Variants } from 'framer-motion'

// ─────────────────────────────────────────────
// 🫧  FLOQ — Framer Motion Animation Library
// src/lib/animations.ts
//
// Rules:
// - Never hardcode transition values inline in components
// - Always import variants from here
// - Use layoutId for shared element transitions
// ─────────────────────────────────────────────


// ── Shared spring configs — reuse these ──────
export const springs = {
  bubbly: {
    type:      'spring',
    stiffness: 500,
    damping:   28,
  } satisfies Transition,

  soft: {
    type:      'spring',
    stiffness: 300,
    damping:   30,
  } satisfies Transition,

  snappy: {
    type:      'spring',
    stiffness: 600,
    damping:   20,
  } satisfies Transition,

  mouse: {
    type:      'spring',
    stiffness: 30,
    damping:   20,
  } satisfies Transition,
} as const


// ── Page transitions ─────────────────────────
export const pageVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y:       -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
}


// ── Auth card ────────────────────────────────
export const authCardVariants: Variants = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { ...springs.soft, delay: 0.1 },
  },
  exit: {
    opacity: 0,
    y:       -16,
    scale:   0.97,
    transition: { duration: 0.2 },
  },
}


// ── Auth screen switch (sign in → OTP → onboarding) ──
export const authScreenVariants: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x:       0,
    transition: { ...springs.soft },
  },
  exit: {
    opacity: 0,
    x:       -20,
    transition: { duration: 0.18 },
  },
}


// ── Message bubble ───────────────────────────
export const messageBubbleVariants: Variants = {
  hidden: {
    opacity: 0,
    y:       16,
    scale:   0.85,
  },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { ...springs.bubbly },
  },
  exit: {
    opacity: 0,
    scale:   0.85,
    transition: { duration: 0.15 },
  },
}


// ── Stagger list (channels, members, notifications) ──
export const staggerListVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren:   0.1,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { ...springs.bubbly },
  },
  exit: {
    opacity: 0,
    x:       -20,
    transition: { duration: 0.15 },
  },
}


// ── Sidebar ───────────────────────────────────
export const sidebarVariants: Variants = {
  hidden:  { x: -280, opacity: 0 },
  visible: {
    x:       0,
    opacity: 1,
    transition: { ...springs.soft },
  },
  exit: {
    x:       -280,
    opacity: 0,
    transition: { duration: 0.2 },
  },
}


// ── Modal / bottom sheet ──────────────────────
export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale:   1,
    y:       0,
    transition: { ...springs.bubbly },
  },
  exit: {
    opacity: 0,
    scale:   0.95,
    y:       10,
    transition: { duration: 0.18 },
  },
}

export const bottomSheetVariants: Variants = {
  hidden:  { y: '100%', opacity: 0 },
  visible: {
    y:       0,
    opacity: 1,
    transition: { ...springs.soft },
  },
  exit: {
    y:       '100%',
    opacity: 0,
    transition: { duration: 0.22 },
  },
}

export const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.18 } },
}


// ── Notification badge ────────────────────────
export const badgeVariants: Variants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: {
    scale:   1,
    opacity: 1,
    transition: { ...springs.snappy },
  },
  exit: {
    scale:   0,
    opacity: 0,
    transition: { duration: 0.12 },
  },
}


// ── Emoji reaction burst ──────────────────────
export const reactionVariants: Variants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: {
    scale:   1,
    opacity: 1,
    transition: { ...springs.snappy },
  },
  exit: {
    scale:   0,
    opacity: 0,
    y:       -20,
    transition: { duration: 0.2 },
  },
}


// ── Tooltip ───────────────────────────────────
export const tooltipVariants: Variants = {
  hidden:  { opacity: 0, y: 4, scale: 0.95 },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { duration: 0.15, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y:       4,
    transition: { duration: 0.1 },
  },
}


// ── Dropdown ──────────────────────────────────
export const dropdownVariants: Variants = {
  hidden:  { opacity: 0, y: -8, scale: 0.96 },
  visible: {
    opacity: 1,
    y:       0,
    scale:   1,
    transition: { ...springs.bubbly },
  },
  exit: {
    opacity: 0,
    y:       -8,
    scale:   0.96,
    transition: { duration: 0.15 },
  },
}


// ── Floating icons (auth background) ─────────
export const floatingIconVariants: Variants = {
  initial: { opacity: 0, y: 10 },
}


// ── Task card (kanban drag) ───────────────────
export const taskCardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { ...springs.bubbly },
  },
  exit: {
    opacity: 0,
    scale:   0.9,
    transition: { duration: 0.15 },
  },
  drag: {
    scale:      1.04,
    rotate:     2,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    transition: { duration: 0.15 },
  },
}


// ── OTP input box ─────────────────────────────
export const otpBoxVariants: Variants = {
  idle:   { scale: 1,    borderColor: 'rgba(255,255,255,0.09)' },
  filled: {
    scale:       [1, 1.12, 1],
    borderColor: 'rgba(59,158,255,0.4)',
    transition:  { ...springs.snappy },
  },
  error: {
    x:          [-6, 6, -6, 6, 0],
    borderColor: 'rgba(239,68,68,0.6)',
    transition:  { duration: 0.4 },
  },
}


// ── Success icon pop ──────────────────────────
export const successIconVariants: Variants = {
  hidden:  { scale: 0, opacity: 0, rotate: -10 },
  visible: {
    scale:   1,
    opacity: 1,
    rotate:  0,
    transition: { ...springs.snappy, delay: 0.1 },
  },
}


// ── Typing indicator dots ─────────────────────
export const typingDotVariants: Variants = {
  hidden:  { opacity: 0, y: 0 },
  visible: (i: number) => ({
    opacity: [0.4, 1, 0.4],
    y:       [0, -5, 0],
    transition: {
      duration: 0.8,
      delay:    i * 0.15,        // stagger each dot
      repeat:   Infinity,
      ease:     'easeInOut',
    },
  }),
}