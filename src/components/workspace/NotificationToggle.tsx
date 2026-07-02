import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/functions";
import { AlertIcon } from "../icons";

// --- Framer Motion Variants ---
const containerVariants = {
    idle: { scale: 1 },
    tap: { scale: 0.98 },
};

const slashVariants = {
    off: { width: 0, opacity: 0, rotate: 45 },
    on: { width: 22, opacity: 1, rotate: 45 }
};

const textVariants = {
    off: { color: "var(--color-bubble)" },
    on: { color: "var(--color-cyan-pop)" }
};

const NotificationToggle = () => {
    const [focusMode, setFocusMode] = useState(true);

    return (
        <motion.div
            onClick={() => setFocusMode((prev) => !prev)}
            variants={containerVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            className={cn(
                "flex items-center gap-3 py-2 px-4 border-2 rounded-(--border-radius) cursor-pointer select-none transition-colors duration-300",
                focusMode ? "border-cyan-pop bg-cyan-pop/10" : "border-border-color bg-transparent"
            )}
        >
            <div className="relative flex items-center justify-center">
                <AlertIcon color={focusMode ? "var(--color-cyan-pop)" : "var(--color-bubble)"} />
                
                <motion.div
                    variants={slashVariants}
                    animate={focusMode ? "on" : "off"}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute bg-cyan-pop h-px origin-center"
                />
            </div>

            <motion.p
                variants={textVariants}
                animate={focusMode ? "on" : "off"}
                className="font-medium"
            >
                Focus Mode {focusMode && "On"}
            </motion.p>
        </motion.div>
    );
};

export default NotificationToggle;