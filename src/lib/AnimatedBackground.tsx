import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export const AnimatedBackground = () => {
  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring makes movement feel smooth and laggy (not instant)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const handleMouse = (e) => {
      // Blob 1 follows mouse at 20% speed
      mouseX.set(e.clientX * 0.02)
      mouseY.set(e.clientY * 0.02)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <motion.div className="bg-animated">

      {/* Blob 1 — follows mouse softly */}
      <motion.div
        className="blob blob-1"
        style={{ x: springX, y: springY }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 2 — slow drift, no mouse tracking */}
      <motion.div
        className="blob blob-2"
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 3 — opposite direction */}
      <motion.div
        className="blob blob-3"
        animate={{ x: [0, 20, 0], y: [0, -25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

    </motion.div>
  )
}