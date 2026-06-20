import { motion, AnimatePresence, delay } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { otpBoxVariants } from '../../lib/variants'
import TickIcon from '../icons/TickIcon'
import type { OTPInputProps } from '../../types/interface'


export const OTPInput = ({
  length = 6,
  onComplete,
  status = 'idle',
  disable = false,
  onSuccessAnimationComplete,
}: OTPInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const [isMerging, setIsMerging] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...values]
    next[index] = digit
    setValues(next)

    if (digit && index < length - 1) refs.current[index + 1]?.focus()
    if (next.every(v => v)) onComplete(next.join(''))
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = [...values]
    pasted.split('').forEach((c, i) => { next[i] = c })
    setValues(next)
    if (next.every(v => v)) onComplete(next.join(''))
  }

  const getBoxState = (index: number) => {
    if (status === 'error') return 'error'
    if (status === 'success') return 'success'
    return values[index] ? 'filled' : 'idle'
  }

  useEffect(() => {
    if (status === 'success') {
      setIsMerging(true)
      setShowSuccess(false)
      return
    }

    setIsMerging(false)
    setShowSuccess(false)
  }, [status])

  const center = (length - 1) / 2
  return (
    <div className="flex gap-2 justify-center">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            variants={otpBoxVariants}
            initial={{
              scale: 0.5,
              opacity: 0,
            }}
            animate="success"
            exit={{
              scale: 0.5,
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 20,
            }}
            className="border-2 border-success rounded-2xl w-12 h-14 flex items-center justify-center"

            onAnimationComplete={() => delay(()=>{
              onSuccessAnimationComplete?.()
            },1500)}
          >
            <TickIcon />
          </motion.div>
        ) : (
          <>
            {values.map((val, i) => {
              const offset = (center - i) * 56

              return (
                <motion.div
                  key={i}
                  onAnimationComplete={() => {
                    if (status === 'success' && isMerging) {
                      setShowSuccess(true)
                    }
                  }}
                  animate={
                    isMerging
                      ? {
                        x: offset,
                        scale: 0.9,
                        opacity: [1, 1, 1, 0],
                      }
                      : {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                      }
                  }
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.input
                    autoComplete='off'
                    ref={el => {
                      refs.current[i] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    animate={getBoxState(i)}
                    variants={otpBoxVariants}
                    initial="idle"
                    disabled={disable}
                    className="
                w-12 h-14 rounded-2xl border-2 text-xl font-bold
                text-white text-center outline-none
                font-heading
              "
                  />
                </motion.div>
              )
            })}
          </>
        )}
      </AnimatePresence>


    </div>
  )
}