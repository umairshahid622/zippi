import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SendIcon } from '../icons'
import type { buttonType } from '../../types/buttonTypes';



interface AppArrowExpandButtonProps {
    label: string;
    type?: buttonType;
    onCallBack?: () => void;
}



function ArrowExpandButton({ label, type, onCallBack }: AppArrowExpandButtonProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={onCallBack}
            type='button'
            className='inline-flex items-center justify-center w-full overflow-hidden border-none whitespace-nowrap bg-gradient-button'
            style={{
                boxShadow: '0 6px 20px rgba(59, 158, 255, 0.35)',
            }}
        >
            {/* Text — slides left to make room for icon */}
            <motion.span
                animate={{ x: hovered ? -4 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
                {label}                
            </motion.span>

            <AnimatePresence>
                <motion.span
                    animate={{
                        x: hovered ? 4 : 0,
                        opacity: hovered ? 1 : 0,
                    }}                    
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <SendIcon />
                </motion.span>
            </AnimatePresence>


        </motion.button>
    )
}

export default ArrowExpandButton