import { AnimatePresence, motion } from 'motion/react'
import { memo, useState } from 'react'
import { SendIcon } from '../icon'
import Loader from './Loader';
import type { AppArrowExpandButtonProps } from '../../types/interface';
import { cn } from '../../utils/functions';



const ArrowExpandButton = memo(({ label, type, isLoading = false, isDisabled = false, onCallBack, icon = <SendIcon className='size-4' />, iconDirection = "right", color = "btn-primary" }: AppArrowExpandButtonProps) => {
    const [hovered, setHovered] = useState(false)
    return (
        <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            onClick={isLoading || isDisabled ? undefined : onCallBack}
            type={type ?? 'button'}
            className={cn(
                'inline-flex relative items-center justify-center w-full overflow-hidden border-none whitespace-nowrap h-12 p-1 ring-purple-primary',
                isLoading || isDisabled && "cursor-not-allowed opacity-85",
                color,
                isLoading && color === "btn-primary" && "shadow-[0_6px_20px_rgba(59,158,255,0.35)]",
                isLoading && color !== "btn-primary" && "shadow-[0_4px_14px_rgba(59,158,255,0.2)]"
            )}
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
                        <AnimatePresence mode='wait'>
                            {hovered && !isDisabled && iconDirection === "left" && (
                                <motion.span
                                    initial={{ width: 0, opacity: 0, x: 0 }}
                                    animate={{ width: 'auto', opacity: 1, x: -5 }}
                                    exit={{ width: 0, opacity: 0, x: 0 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {icon}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <motion.span layout="position">
                            {label}
                        </motion.span>

                        <AnimatePresence mode='wait'>
                            {hovered && !isDisabled && iconDirection === "right" && (
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
                                    {icon}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    )
})

export default ArrowExpandButton