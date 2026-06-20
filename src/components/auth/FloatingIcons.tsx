import { motion } from 'framer-motion'
import { floatingIconVariants } from '../../lib/variants'
import { MessageIcon, RocketIcon, BubbleIcon, NeutronIcon } from '../icons'
import { floatingAnimation } from '../../lib/animations'
import { memo } from 'react'
import type { FloatingItem } from '../../types/interface'

const FLOATING_ICONS: FloatingItem[] = [
  {
    id: 1,
    icon: <BubbleIcon color='var(--color-bubble)' />,
    position: { left: '6%', top: '22%' },
    duration: 6,
    delay: 0,
  },
  {
    id: 2,
    icon: <NeutronIcon color='var(--color-bubble)' />,
    position: { right: '8%', top: '30%' },
    duration: 8,
    delay: -2,
  },
  {
    id: 3,
    icon: <RocketIcon />,
    position: { left: '10%', bottom: '24%' },
    duration: 7,
    delay: -1,
  },
  {
    id: 4,
    icon: <MessageIcon color='var(--color-bubble)' />,
    position: { right: '6%', bottom: '18%' },
    duration: 9,
    delay: -3,
  },
]

export const FloatingIcons = memo(() => {
  return (
    <>
      {FLOATING_ICONS.map(item => (
        <motion.div
          key={item.id}
          className="fixed z-0 pointer-events-none"
          style={item.position}
          initial="initial"
          animate={floatingAnimation(item.duration, item.delay)}
          variants={floatingIconVariants}
        >
          {item.icon}
        </motion.div>
      ))}
    </>
  )
});