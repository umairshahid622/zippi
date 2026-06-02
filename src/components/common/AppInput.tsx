import { motion, AnimatePresence } from 'framer-motion'
import { useState, forwardRef } from 'react'
import { inputIconVariants, inputLabelVariants, inputMessageVariants, inputVariants } from '../../lib/variants'
import { inputIconSize } from '../../constants/constants'


interface InputProps {
    label?: string
    placeholder?: string
    type?: string
    value?: string
    icon?: React.ReactNode
    message?: string
    status?: 'idle' | 'focus' | 'error' | 'success'
    maxLength?: number,
    iconSize?: number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: () => void
    onBlur?: () => void
}

export const AppInput = forwardRef<HTMLInputElement, InputProps>(({
    label,
    placeholder,
    type = 'text',
    value,
    icon,
    message,
    status = 'idle',
    iconSize = inputIconSize,
    maxLength,
    onChange,
    onFocus,
    onBlur,
}, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const currentState = status !== 'idle' ? status : isFocused ? 'focus' : 'idle'

    return (
        <div className="flex flex-col gap-1.5 w-full">

            {/* Label */}
            {label && (
                <motion.label
                    className="text-label"
                    animate={currentState}
                    variants={inputLabelVariants}
                >
                    {label}
                </motion.label>
            )}

            {/* Input wrapper */}
            <div className="relative">

                {/* Icon */}
                {icon && (
                    <motion.span
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            left: 14,
                            width: iconSize,
                            height: iconSize,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        animate={currentState}
                        variants={inputIconVariants}
                    >
                        {icon}
                    </motion.span>
                )}

                {/* Input */}
                <motion.input
                    ref={ref}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    onChange={onChange}
                    onFocus={() => { setIsFocused(true); onFocus?.() }}
                    onBlur={() => { setIsFocused(false); onBlur?.() }}
                    animate={currentState}
                    variants={inputVariants}
                    initial="idle"
                    className={`
            w-full rounded-(--border-radius) app-border py-3 pr-4 text-(--text-color) font-(--weight-bold)
            font-heading outline-none placeholder:text-muted cursor-auto text-sm
            ${icon ? 'pl-11' : 'pl-4'}
          `}
                />
            </div>

            {/* Message — animates in/out */}
            <AnimatePresence mode="wait">
                {message && (
                    <motion.p
                        key={message}
                        className="text-caption pl-1"
                        variants={inputMessageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            color: status === 'error' ? 'var(--color-error)'
                                : status === 'success' ? 'var(--color-success)'
                                    : 'rgba(255,255,255,0.35)',
                        }}
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>

        </div>
    )
})

AppInput.displayName = 'Input'