import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import type { TextButtonProps } from "../../types/interface"

const AppTextButton = ({ label, onCallBack, iconDirection = "right", isDisabled }: TextButtonProps) => {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.button
            layout="position"
            onClick={isDisabled ? undefined : onCallBack}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={`border-none text-xs flex items-center justify-center font-bold ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <AnimatePresence mode="wait">
                {
                    hovered && iconDirection == "left" &&
                    <motion.span
                        initial={{ width: 0, opacity: 0, x: 0 }}
                        animate={{ width: 'auto', opacity: 1, x: -5 }}
                        exit={{ width: 0, opacity: 0, x: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className={"inline-flex items-center justify-center overflow-hidden"}
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