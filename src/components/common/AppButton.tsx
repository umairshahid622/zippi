import { AnimatePresence, motion } from "motion/react";
import { buttonGhostVariants } from "../../lib/variants";
import Loader from "./Loader";
import type { AppButtonProps } from "../interface";





function AppButton({ label, type, icon, isLoading = false, isDisabled = false, onCallBack }: AppButtonProps) {

    return <motion.button
        type={type}
        className={`flex gap-2 items-center justify-center w-full`}
        onClick={isLoading || isDisabled ? undefined : onCallBack}
        variants={isDisabled ? undefined : buttonGhostVariants}
        initial="idle"
        whileHover={isLoading ? undefined : "hover"}
        whileTap={isLoading ? undefined : "tap"}
        disabled={isLoading || isDisabled}
        style={{
            position: 'relative',
            cursor: isLoading || isDisabled ? 'not-allowed' : 'pointer',
            opacity: isLoading || isDisabled ? 0.75 : 1,
        }}
    >
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.span
                    key="loader"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    style={{ display: 'inline-flex', alignItems: 'center' }}
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
                        gap: '0.5rem',
                    }}
                >
                    {icon && icon}
                    {label}
                </motion.span>
            )}
        </AnimatePresence>
    </motion.button>

}

export default AppButton