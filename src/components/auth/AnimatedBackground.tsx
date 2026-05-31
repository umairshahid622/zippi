import { motion, MotionValue, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import './Lib.css'

interface Star {
  id: number
  width: number
  height: number
  left: number
  top: number
  duration: number
  delay: number
}

export const AnimatedBackground = () => {
  const starsRef = useRef<HTMLDivElement>(null)
  // Mouse tracking
  const mouseX: MotionValue = useMotionValue(0)
  const mouseY: MotionValue = useMotionValue(0)

  // Spring makes movement feel smooth and laggy (not instant)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // Blob 1 follows mouse at 20% speed
      mouseX.set(e.clientX * 0.02)
      mouseY.set(e.clientY * 0.02)
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])


  useEffect(() => {
    const container = starsRef.current
    if (!container) return

    // Generate 60 stars
    const stars: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      width: Math.random() * 2 + 1,       // 1px – 3px
      height: Math.random() * 2 + 1,
      left: Math.random() * 100,          // 0% – 100%
      top: Math.random() * 100,
      duration: 2 + Math.random() * 4,        // 2s – 6s
      delay: -(Math.random() * 4),         // negative = already mid-animation on mount
    }))

    stars.forEach(star => {
      const el = document.createElement('div')
      el.className = 'star'
      el.style.cssText = `
        width:             ${star.width}px;
        height:            ${star.height}px;
        left:              ${star.left}%;
        top:               ${star.top}%;
        --star-duration:   ${star.duration}s;
        --star-delay:      ${star.delay}s;
      `
      container.appendChild(el)
    })

    // Cleanup on unmount
    return () => {
      container.innerHTML = ''
    }
  }, [])

  

  return (
    <motion.div className="bg-animated">

      <div ref={starsRef} className="stars-container" />
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