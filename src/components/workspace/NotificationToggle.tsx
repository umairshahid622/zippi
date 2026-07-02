import { useState } from "react"
import { cn } from "../../utils/functions"
import { AlertIcon } from "../icons";

const NotificationToggle = () => {
    const [focusMode, setFocusMode] = useState(true);
    return (
        <div
            onClick={() => setFocusMode((prev) => !prev)}
            className={cn(
                "flex items-center gap-3 py-2 px-4 border-2 rounded-(--border-radius) border-border-color cursor-pointer select-none transition-all",
                focusMode && " border-cyan-pop bg bg-cyan-pop/10"
            )}>
            <div className="relative">
                <AlertIcon
                    color={`${focusMode ? 'var(--color-cyan-pop)' : 'var(--color-bubble)'} `}
                />
                <div className={cn(
                    "bg-cyan-pop h-px absolute left-0 top-0 rotate-45 animate-bounce transition-all origin-top-left",
                    focusMode ? 'w-5.5' :'w-0'
                )}></div>
            </div>
            <p className={cn(
                focusMode && "text-cyan-pop "
            )}>Focus Mode {focusMode && 'On'}</p>
        </div>
    )
}

export default NotificationToggle