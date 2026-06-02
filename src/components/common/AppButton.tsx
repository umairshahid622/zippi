import { AnimatePresence, motion } from "motion/react";
import { buttonGhostVariants } from "../../lib/variants";
import { type JSX } from "react";
import type { buttonType } from "../../types/buttonTypes";
import Loader from "./Loader";

interface AppButtonProps {
    label: string;
    className?: string;
    type?: buttonType;
    icon?: JSX.Element;
    isLoading?: boolean;
    onCallBack?: () => void;
}



function AppButton({ label, className, type, icon, isLoading = false, onCallBack }: AppButtonProps) {

    return <motion.button
        type={type}
        className={`flex gap-2 items-center justify-center w-full ${className ?? ''}`}
        onClick={onCallBack}
        variants={buttonGhostVariants}
        initial="idle"
        whileHover={isLoading ? undefined : "hover"}
        whileTap={isLoading ? undefined : "tap"}
        disabled={isLoading}
        style={{
            position: 'relative',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.75 : 1,
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
                    <Loader variant="dots" size="md" />
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