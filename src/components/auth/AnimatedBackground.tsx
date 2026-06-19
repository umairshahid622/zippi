import { motion } from 'motion/react'
import { memo, useEffect, useRef } from 'react'
import type { Star } from '../interface';

export const AnimatedBackground = memo(() => {
  console.warn("AnimatedBackground Reloaded");

  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = starsRef.current
    if (!container) return

    const stars: Star[] = Array.from({ length: 60 }, (_, i) => {
      const size = Math.random() * 2 + 2
      return {
        id: i,
        width: size,
        height: size,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 4,
        delay: -(Math.random() * 4),
      }
    })

    stars.forEach(star => {
      const el = document.createElement('div')
      el.className = 'absolute rounded-full bg-white'
      el.style.width = `${star.width}px`
      el.style.height = `${star.height}px`
      el.style.left = `${star.left}%`
      el.style.top = `${star.top}%`
      el.style.animation = `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`
      container.appendChild(el)
    })

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <motion.div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div ref={starsRef} className="absolute inset-0 z-10 pointer-events-none" />

      <div
        className="blob size-125 bg-blue-primary opacity-25 -top-24 -left-36"

      />

      <div
        className="blob size-96 bg-cyan-pop opacity-20 -bottom-20 -right-24"
      />

      <div
        className="blob size-80 bg-purple-primary opacity-20 top-1/2 left-1/2"
      />
    </motion.div>
  )
});