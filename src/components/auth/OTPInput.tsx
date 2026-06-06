import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState }        from 'react'
import { otpBoxVariants } from '../../lib/variants'


interface OTPInputProps {
  length?:   number
  onComplete: (otp: string) => void
  status?:   'idle' | 'error' | 'success',
  disable: boolean
}

export const OTPInput = ({
  length     = 6,
  onComplete,
  status     = 'idle',
  disable = false
}: OTPInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next  = [...values]
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
    const next   = [...values]
    pasted.split('').forEach((c, i) => { next[i] = c })
    setValues(next)
    if (next.every(v => v)) onComplete(next.join(''))
  }

  const getBoxState = (index: number) => {
    if (status === 'error')   return 'error'
    if (status === 'success') return 'success'
    return values[index] ? 'filled' : 'idle'
  }

  return (
    <div className="flex gap-2 justify-center">
      {values.map((val, i) => (
        <motion.input
          key={i}
          ref={el => { refs.current[i] = el; }}
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
      ))}
    </div>
  )
}