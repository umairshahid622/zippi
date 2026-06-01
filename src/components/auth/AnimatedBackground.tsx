import { motion, MotionValue, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { blob1Animation, blob2Animation, blob3Animation } from '../../lib/variants'


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
  const mouseX: MotionValue = useMotionValue<number>(0)
  const mouseY: MotionValue = useMotionValue<number>(0)

  // Spring makes movement feel smooth and laggy (not instant)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  // useEffect(() => {
  //   const handleMouse = (e: MouseEvent) => {
  //     // Blob 1 follows mouse at 20% speed
  //     mouseX.set(e.clientX * 0.02)
  //     mouseY.set(e.clientY * 0.02)
  //   }
  //   window.addEventListener('mousemove', handleMouse)
  //   return () => window.removeEventListener('mousemove', handleMouse)
  // }, [])


  useEffect(() => {
    const container = starsRef.current
    if (!container) return

    // Generate 60 stars


    const stars: Star[] = Array.from({ length: 60 }, (_, i) => {

      const size = Math.random() * 3 + 2;

      return ({
          id: i,
          width: size,
          height: size,          
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: 2 + Math.random() * 4,
          delay: -(Math.random() * 4),
      })
    })

    stars.forEach(star => {
      const el = document.createElement('div')
      el.className = 'absolute rounded-full bg-[var(--color-white)] animate-twinkle!'
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
    <motion.div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      <div ref={starsRef} className="absolute inset-0 pointer-events-none" />

      {/* Blob 1 — follows mouse softly */}
      <motion.div
        className="blob size-125 bg-blue-primary opacity-25 -top-24 -left-36"
        style={{ x: springX, y: springY }}
        animate={{ scale: blob1Animation.scale }}
        transition={blob1Animation.transition}
      />

      {/* Blob 2 — drift only, no mouse */}
      <motion.div
        className="blob size-96 bg-cyan-pop opacity-20 -bottom-20 -right-24"
        animate={{ x: blob2Animation.x, y: blob2Animation.y }}
        transition={blob2Animation.transition}
      />

      {/* Blob 3 — drift opposite direction */}
      <motion.div
        className="blob size-80 bg-purple-primary opacity-20 top-1/2 left-1/2"
        animate={{ x: blob3Animation.x, y: blob3Animation.y }}
        transition={blob3Animation.transition}
      />

    </motion.div>
  )
}