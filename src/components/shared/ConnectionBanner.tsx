import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "../../hooks/hooks";
import { selectConnectionStatus } from "../../store/slices/connectionSlice";

const COPY: Record<"connecting" | "offline", string> = {
  offline: "Connection lost — trying to reconnect...",
  connecting: "Reconnecting...",
};

export default function ConnectionBanner() {
  const status = useAppSelector(selectConnectionStatus);
  const visible = status === "offline" || status === "connecting";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          role="status"
          className="absolute top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full px-4 py-1.5 border"
          style={{
            background: "var(--color-black-pearl)",
            borderColor: "var(--color-error)",
            color: "var(--text-body-color)",
            fontSize: "var(--text-body-sm)",
            boxShadow: "0 0 0 4px var(--color-box-shadow-error)",
          }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "var(--color-error)" }}
          />
          {COPY[status as "connecting" | "offline"]}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
