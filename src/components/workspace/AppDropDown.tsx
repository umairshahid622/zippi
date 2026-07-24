import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/functions";
import { Cheveron, HashTagIcon, PlusIcon } from "../icon";
import type { AppDropDownProps } from "../../types/interface";
import { useNavigate, useParams } from "react-router";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%" }
};

const AppDropDown = memo(({ title, content, selectedChannel, workspaceId, onAddCallback }: AppDropDownProps) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const navigate = useNavigate()
    const { workspaceId: routeWorkspaceId } = useParams()
    const resolvedWorkspaceId = workspaceId ?? routeWorkspaceId

    if (!content || content.length === 0 || !title) {
        return null;
    }

    console.log(selectedChannel);
    

    return (
        <motion.div layout="position">
            <div className="flex items-center justify-between gap-2 px-3 py-1">
                <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer w-full">
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                        <Cheveron className="text-(--text-body-color)" />
                    </motion.div>
                    <h4 className="uppercase font-semibold text-(--text-body-color)">{title}</h4>
                </div>
                <div className="cursor-pointer" onClick={onAddCallback}>
                    <PlusIcon className="text-(--text-body-color)" />
                </div>
            </div>

            <AnimatePresence initial={true} mode="popLayout">
                {isOpen && (
                    <motion.div className="overflow-hidden" layout="position" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                        {content.map((channel) => {
                            const isSelected = selectedChannel === channel.id;
                            return (
                                <motion.div
                                    key={channel.id}
                                    variants={itemVariants}
                                    onClick={() => {
                                        if (!resolvedWorkspaceId) return;
                                        navigate(`/workspace/${resolvedWorkspaceId}/channel/${channel.id}`)
                                    }}
                                    className="relative flex items-center gap-2 pl-6 py-1.5 group cursor-pointer"
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="active-channel"
                                            className="absolute inset-0 bg-white/10 border-l-2 border-cyan-pop"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        >
                                            <span className="absolute left-0 top-0 h-full w-2 bg-cyan-pop/60 blur-sm" />
                                        </motion.div>
                                    )}

                                    <HashTagIcon className={cn("text-white z-10", !isSelected && "group-hover:text-cyan-pop")} />
                                    <p className="z-10">{channel.name}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

AppDropDown.displayName = 'AppDropDown'
export default AppDropDown;