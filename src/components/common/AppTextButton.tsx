import { AnimatePresence, motion } from "motion/react"
import type { TextButtonProps } from "../interface"
import { useState } from "react"

const AppTextButton = ({ label, onCallBack, iconDirection = "right" }: TextButtonProps) => {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.button
            layout="position"
            onClick={onCallBack}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="border-none text-xs flex items-center justify-center font-bold"
        >
            <AnimatePresence mode="wait">
                {
                    hovered && iconDirection == "left" &&
                    <motion.span
                        initial={{ width: 0, opacity: 0, x: 0 }}
                        animate={{ width: 'auto', opacity: 1, x: -5 }}
                        exit={{ width: 0, opacity: 0, x: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className="inline-flex items-center justify-center overflow-hidden"
                    >
                        ←
                    </motion.span>
                }
            </AnimatePresence>

            {label}
            <AnimatePresence mode="wait">
                {
                    hovered && iconDirection == "right" &&
                    <motion.span
                        initial={{ width: 0, opacity: 0, x: 0 }}
                        animate={{ width: 'auto', opacity: 1, x: 5 }}
                        exit={{ width: 0, opacity: 0, x: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className="inline-flex items-center justify-center overflow-hidden"
                    >
                        →
                    </motion.span>
                }
            </AnimatePresence>
        </motion.button>
    )
}

export default AppTextButton