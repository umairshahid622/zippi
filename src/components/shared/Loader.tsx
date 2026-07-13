import { AnimatePresence, motion } from 'motion/react'
import { loaderContainerVariants } from '../../lib/variants'
import type { LoaderSize } from '../../types/types'
import type { LoaderProps } from '../../types/interface'

// ─────────────────────────────────────────────
// Loader — Creative Framer Motion Loader
//
// Variants:
//   'spinner' — Chasing constellation: glowing dots
//               orbiting in a ring with a breathing
//               nucleus, staggered wave of light chases
//               around the circle. Multi-color brand
//               palette. Spring-physics entry/exit.
//
//   'dots'    — Elastic morphing bars: bars that stretch
//               and squish with spring-like overshoot,
//               inverse scaleX/scaleY for liquid feel,
//               per-bar stagger + gradient color flow.
//
//   'pulse'   — Sonar ripple cascade: concentric rings
//               expand outward with staggered timing,
//               each ring fading as it grows. Gradient
//               center dot breathes in counterpoint.
//
// Sizes:  'sm' (16px)  |  'md' (24px)  |  'lg' (48px)
// ─────────────────────────────────────────────




const sizePx: Record<LoaderSize, number> = {
  sm: 22,
  md: 28,
  lg: 48,
}

// ── SPINNER: Chasing Constellation ────────────
//
// A ring of small dots with a wave of brightness
// chasing around them — each dot scales up, glows,
// and fades back with a staggered delay. A breathing
// nucleus pulses at the center.
//
// Why Framer Motion: per-element custom delay-based
// keyframe stagger, spring-physics entry, multi-prop
// keyframes with different timings — impossible with
// CSS @keyframes or Tailwind animate-*.
// ──────────────────────────────────────────────

function ConstellationSpinner({
  size,
  color,
}: {
  size: LoaderSize
  color: string
}) {
  const px = sizePx[size]
  const dotCount = size === 'sm' ? 5 : size === 'md' ? 7 : 10
  const radius = px * 0.34
  const dotSize = Math.max(px * 0.12, 2.5)
  const nucleusSize = Math.max(px * 0.16, 3)

  // Use multi-color palette for standalone, single color for buttons
  const isMultiColor = color !== 'currentColor'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        width: px,
        height: px,
        position: 'relative',
      }}
    >
      {/* ── Breathing nucleus ── */}
      <motion.div
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: nucleusSize,
          height: nucleusSize,
          borderRadius: '50%',
          background: color,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: isMultiColor
            ? `0 0 ${nucleusSize * 1.5}px ${color}60`
            : undefined,
        }}
      />

      {/* ── Orbiting constellation dots ── */}
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2 - Math.PI / 2
        const cx = Math.cos(angle) * radius + px / 2 - dotSize / 2
        const cy = Math.sin(angle) * radius + px / 2 - dotSize / 2
        const dotColor = color

        // Each dot also "breathes" radially outward when glowing
        const breathX = Math.cos(angle) * px * 0.04
        const breathY = Math.sin(angle) * px * 0.04

        return (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0.35, 2, 0.35],
              opacity: [0.1, 1, 0.1],
              x: [0, breathX, 0],
              y: [0, breathY, 0],
            }}
            transition={{
              duration: 1.8,
              delay: (i / dotCount) * 1.8,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: 'absolute',
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              backgroundColor: dotColor,
              left: cx,
              top: cy,
              boxShadow: `0 0 ${dotSize * 2}px ${dotColor}`,
            }}
          />
        )
      })}
    </motion.div>
  )
}


// ── DOTS: Elastic Morphing Bars ───────────────
//
// Vertical bars that stretch tall and squish wide
// with spring-like overshoot (cubic-bezier beyond 1.0).
// scaleY and scaleX animate inversely to create a
// volume-preserving "liquid rubber" feel. Bars morph
// borderRadius when compressed vs stretched.
//
// Why Framer Motion: multi-property keyframes with
// per-property timing, overshoot bezier curves,
// staggered delay per element, borderRadius morph —
// this combination is impossible with Tailwind.
// ──────────────────────────────────────────────

function ElasticBars({
  size,
  color,
}: {
  size: LoaderSize
  color: string
}) {
  const px = sizePx[size]
  const barCount = size === 'lg' ? 5 : 4
  const barWidth = Math.max(px * 0.13, 2.5)
  const barHeight = px * 0.55
  const gap = Math.max(px * 0.09, 1.5)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        height: px,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const barColor = color

        return (
          <motion.div
            key={i}
            animate={{
              // Stretch tall → overshoot → settle → squish short
              scaleY: [0.3, 1.5, 1.1, 0.3],
              // Inverse: wide when short, thin when tall
              scaleX: [1.4, 0.6, 0.8, 1.4],
              opacity: [0.35, 1, 0.9, 0.35],
              // Pill shape when short, sharper when stretched
              borderRadius: [
                `${barWidth}px`,
                `${barWidth * 0.25}px`,
                `${barWidth * 0.35}px`,
                `${barWidth}px`,
              ],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.35, 0.5, 1],
              delay: i * 0.12,
              repeat: Infinity,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
            style={{
              width: barWidth,
              height: barHeight,
              backgroundColor: barColor,
              borderRadius: barWidth,
              transformOrigin: 'center',
              boxShadow: `0 0 ${barWidth * 1.5}px ${barColor}50`,
            }}
          />
        )
      })}
    </motion.div>
  )
}


// ── PULSE: Sonar Ripple Cascade ───────────────
//
// Concentric rings continuously expand outward with
// staggered delays, each ring fading and thinning as
// it grows — like sonar or a water droplet. A gradient
// center dot breathes in counterpoint to the rings.
//
// Why Framer Motion: orchestrated staggered expansion
// with per-ring delay, multi-prop keyframes (scale +
// opacity + borderWidth), spring-physics entry, and
// AnimatePresence exit — none of this is practical
// with CSS-only or Tailwind.
// ──────────────────────────────────────────────

function SonarRipple({
  size,
  color,
}: {
  size: LoaderSize
  color: string
}) {
  const px = sizePx[size]
  const ringCount = 3
  const centerDotSize = Math.max(px * 0.18, 3)
  const ringDiameter = px * 0.72
  const borderThick = Math.max(px * 0.06, 1.5)
  const borderThin = Math.max(px * 0.02, 0.5)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        width: px,
        height: px,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Expanding ripple rings ── */}
      {Array.from({ length: ringCount }).map((_, i) => {
        const ringColor = color

        return (
          <motion.div
            key={i}
            animate={{
              scale: [0.25, 1.3],
              opacity: [0.9, 0],
              borderWidth: [borderThick, borderThin],
            }}
            transition={{
              duration: 2.2,
              delay: i * 0.65,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: ringDiameter,
              height: ringDiameter,
              borderRadius: '50%',
              borderStyle: 'solid',
              borderColor: ringColor,
              boxShadow: `0 0 ${px * 0.08}px ${ringColor}30, inset 0 0 ${px * 0.08}px ${ringColor}15`,
            }}
          />
        )
      })}

      {/* ── Breathing center dot ── */}
      <motion.div
        animate={{
          scale: [0.8, 1.35, 0.8],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: centerDotSize,
          height: centerDotSize,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 ${centerDotSize * 1.2}px ${color}80`,
        }}
      />
    </motion.div>
  )
}


// ── Main Loader Component ─────────────────────
function Loader({
  variant = 'spinner',
  size = 'md',
  color = 'var(--color-bubble)',
  label,
  className,
}: LoaderProps) {
  const loaderElement = (() => {
    switch (variant) {
      case 'dots':
        return <ElasticBars size={size} color={color} />
      case 'pulse':
        return <SonarRipple size={size} color={color} />
      case 'spinner':
      default:
        return <ConstellationSpinner size={size} color={color} />
    }
  })()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={loaderContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: label ? 8 : 0,
        }}
        role="status"
        aria-label={label ?? 'Loading'}
      >
        {loaderElement}

        {label && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              fontSize:
                size === 'sm'
                  ? '0.75rem'
                  : size === 'md'
                    ? '0.8125rem'
                    : '0.875rem',
              fontWeight: 500,
              color: 'var(--text-color)',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default Loader