// components/ModalManager.tsx
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import CreateWorkspaceModal from './modals/CreateWorkspaceModal'
import { closeModal, selectActiveModal, selectActiveModalHeading } from '../../store/slices/uiSlice'
import { useAppSelector } from '../../hooks/hooks'
import { CrossIcon } from '../icon'

const MODAL_COMPONENTS: { [key: string]: React.ComponentType<any> } = {
    CREATE_WORKSPACE_MODAL: CreateWorkspaceModal,
}

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.75,
        y: 40,
        rotate: -4,
        filter: 'blur(8px)',
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 340,
            damping: 20,
            mass: 0.9,
            when: 'beforeChildren',
            staggerChildren: 0.04,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.85,
        y: 20,
        rotate: 3,
        filter: 'blur(6px)',
        transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    },
}

const backdropVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(3px)', transition: { duration: 0.25 } },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.2 } },
}

// Content inside the card fades/slides up individually
const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 26 } },
}

const glowVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: {
        opacity: [0, 0.6, 0.4],
        scale: [0.6, 1.15, 1],
        transition: { duration: 1.4, ease: 'easeOut', times: [0, 0.5, 1] },
    },
}

export const ModalManager = () => {
    const activeModal = useAppSelector(selectActiveModal)
    const activeModalHeading = useAppSelector(selectActiveModalHeading)
    const dispatch = useDispatch()

    const SpecificModal = activeModal ? MODAL_COMPONENTS[activeModal] : null

    return (
        <AnimatePresence>
            {activeModal && SpecificModal && (
                <motion.div
                    key="modal-backdrop"
                    className="fixed inset-0 flex justify-center items-center z-50 p-5"
                    style={{ background: 'rgba(10, 22, 40, 0.55)' }}
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    // onClick={() => dispatch(closeModal())}
                >
                    <motion.div
                        key="modal-card"
                        className="relative w-full max-w-2xl"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            variants={glowVariants}
                            className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] blur-3xl"
                            style={{
                                background:
                                    'radial-gradient(circle at 30% 20%, rgba(59,158,255,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,212,232,0.3), transparent 55%)',
                            }}
                        />

                        <div className="glass-card p-6 flex flex-col gap-6 items-center">
                            
                            <motion.div variants={childVariants} className='flex items-center justify-center w-full relative'>
                                <h2>{activeModalHeading}</h2>
                                <motion.span
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => dispatch(closeModal())}
                                    whileHover={{ scale: 1.15, rotate: 90 }}
                                    whileTap={{ scale: 0.85, rotate: 90 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                    className="absolute right-0 inline-flex items-center justify-center size-9 rounded-full text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer shrink-0"
                                    style={{ transformOrigin: '50% 50%' }}
                                >
                                    <CrossIcon />
                                </motion.span>
                            </motion.div>
                            <motion.div variants={childVariants} className="w-full">
                                <SpecificModal />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}