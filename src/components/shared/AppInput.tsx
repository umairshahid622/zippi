import { motion, AnimatePresence } from "framer-motion";
import { useState, forwardRef, memo } from "react";
import {
  inputIconVariants,
  inputLabelVariants,
  inputMessageVariants,
  inputVariants,
} from "../../lib/variants";
import { inputIconSize } from "../../constants/constants";
import type { InputProps } from "../../types/interface";
import { cn } from "../../utils/functions";



export const AppInput = memo(forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      value,
      icon,
      message,
      status = "idle",
      disabled = false,
      iconSize = inputIconSize,
      maxLength,
      className,
      name,
      actionButtons,
      onChange,
      onFocus,
      onBlur,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const currentState =
      status !== "idle" ? status : isFocused ? "focus" : "idle";
    

    return (
      <motion.div
        animate={{
          opacity: disabled ? 0.5 : 1,
          scale: disabled ? 0.98 : 1,
        }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <motion.label
            className="text-label pl-2"
            animate={currentState}
            variants={inputLabelVariants}
          >
            {label}
          </motion.label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {icon && (
            <motion.span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: 14,
                width: iconSize,
                height: iconSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={currentState}
              variants={inputIconVariants}
            >
              {icon}
            </motion.span>
          )}

          {actionButtons && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 items-center">
              {actionButtons.map((actionBtn, idx) => {
                const { icon, label, iconClassName, ...restProps } = actionBtn;
                return (
                  <button key={idx}
                    aria-label={label}
                    className={cn(
                      "border-none",
                      iconClassName
                    )}
                    {...restProps}>
                    {icon}
                  </button>
                )
              })}
            </div>
          )}
          <motion.input
            name={name}
            ref={ref}
            type={type}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={onChange}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            onBlur={() => {
              setIsFocused(false);
              onBlur?.();
            }}
            animate={currentState}
            variants={inputVariants}
            initial="idle"
            className={
              cn(
                'w-full rounded-(--border-radius) app-border py-3 text-(--text-body-color) font-(--weight-bold) font-heading outline-none placeholder:text-(--text-body-color) cursor-auto text-sm caret-white',
                icon ? 'pl-9' : 'pl-4',
                actionButtons ? "pr-22" : "pr-4",
                className
              )
            }
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
                color:
                  status === "error"
                    ? "var(--color-error)"
                    : status === "success"
                      ? "var(--color-success)"
                      : "var(--color-bubble)",
              }}
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
));

AppInput.displayName = "Input";
