import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { SendIcon } from '../icons'
import Loader from './Loader';
import type { AppArrowExpandButtonProps } from '../interface';



function ArrowExpandButton({ label, type, isLoading = false, isDisabled = false, onCallBack }: AppArrowExpandButtonProps) {
    const [hovered, setHovered] = useState(false)

    return (
        <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={isLoading || isDisabled ? undefined : onCallBack}
            type={type ?? 'button'}
            className='inline-flex relative items-center justify-center w-full overflow-hidden border-none whitespace-nowrap bg-gradient-button'
            style={{
                boxShadow: isLoading
                    ? '0 4px 14px rgba(59, 158, 255, 0.2)'
                    : '0 6px 20px rgba(59, 158, 255, 0.35)',
                cursor: isLoading || isDisabled ? 'not-allowed' : 'pointer',
                opacity: isLoading || isDisabled ? 0.85 : 1,
            }}
            disabled={isLoading || isDisabled}
        >
            <AnimatePresence mode='wait'>
                {isLoading ? (
                    <motion.span
                        key="loader"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >                                                
                        <Loader variant="dots" size="sm" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                        }}
                    >
                        <motion.span layout="position">
                            {label}
                        </motion.span>

                        <AnimatePresence mode='wait'>
                            {hovered && !isDisabled && (
                                <motion.span
                                    initial={{ width: 0, opacity: 0, x: 0 }}
                                    animate={{ width: 'auto', opacity: 1, x: 5 }}
                                    exit={{ width: 0, opacity: 0, x: 0 }}
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
                            )}
                        </AnimatePresence>
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export default ArrowExpandButton