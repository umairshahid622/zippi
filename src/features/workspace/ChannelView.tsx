import { useEffect, useRef } from "react"
import { setActiveChannelId as setWorkspaceActiveChannelId } from "../../store/slices/workspaceSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useParams } from "react-router"
import { selectChannelsForWorkspace } from "../../store/slices/channelSlice"
import { AppInput } from "../../components/shared/AppInput"
import { ClipIcon, HashTagIcon, MessageIcon, SendIcon } from "../../components/icon"
import { getSocket } from "../../lib/socket"
import { fetchMessages, selectMessagesForChannel } from "../../store/slices/messageSlice"
import { selectUser } from "../../store/slices/authSlice"
import type { Message } from "../../types/interface"
import { AnimatePresence, motion, type Variants } from "motion/react"
import ProfileAvatar from "../../components/workspace/ProfileAvatar"


interface Props {
    workspaceId: string
    channelId: string
}

const messageVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { type: 'spring', stiffness: 400, damping: 28 },
    },
}

const ChannelView = () => {
    const { workspaceId, channelId } = useParams()
    const dispatch = useAppDispatch()
    const channels = useAppSelector(selectChannelsForWorkspace(workspaceId ?? null))
    const channel = channels.find((item) => item.id === channelId) ?? null

    useEffect(() => {
        if (channelId) {
            dispatch(setWorkspaceActiveChannelId(channelId))
        }
    }, [channelId, dispatch])

    useEffect(() => {
        if (!workspaceId || !channelId) return

        const socket = getSocket()
        socket.emit('channel:join', { workspaceId, channelId })

        return () => {
            socket.emit('channel:leave', { channelId })
        }
    }, [workspaceId, channelId])


    const onMessageSend = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!workspaceId || !channelId) return
        const data = new FormData(event.target)
        const message = (data.get("chatMessage") as string)?.trim() ?? ''
        if (!message) return

        const socket = getSocket()

        socket.emit(
            'message:send',
            { workspaceId, channelId, content: message },
            (response: { success: boolean; message?: any; error?: string }) => {
                if (!response.success) {
                    console.error('Failed to send message:', response.error)
                }
            }
        )
        event.currentTarget.reset()
    }



    if (!channel) return null
    return (
        <div className="flex flex-col h-full">
            <div className="p-2 flex items-center gap-2">
                <div className='inline-flex items-center justify-between bg-gradient-dark p-2 rounded-(--border-radius)'>
                    <MessageIcon color='var(--color-text-muted)' className='size-6' />
                </div>
                <div >
                    <div className="flex items-center gap-1"><HashTagIcon className="text-white" size={18} /> <h2 className="inline-flex">{channel?.name}</h2></div>
                    <p className="text-muted">{channel?.description}</p>
                </div>

            </div>
            <div className="app-divider"></div>
            <MessageList workspaceId={workspaceId ?? ""} channelId={channelId ?? ""} />
            <form onSubmit={onMessageSend} className="pb-4 pt-1 px-4">
                <AppInput name="chatMessage" placeholder={`Type in ${channel?.name}`}
                    actionButtons={[
                        {
                            icon: <ClipIcon className="size-5" />,
                            iconClassName: "rounded-lg p-1.5 transition-colors",
                            label: 'Attach File',
                            type: "button"
                        },
                        {
                            icon: <SendIcon className="size-5" />,
                            iconClassName: "bg-white/20 rounded-lg p-1.5 hover:bg-white/10 transition-colors",
                            label: 'Send Message',
                            type: "submit"
                        },

                    ]}
                />
            </form>
        </div>
    )
}



function MessageList({ workspaceId, channelId }: Props) {
    const dispatch = useAppDispatch()
    const messages: Message[] = useAppSelector(selectMessagesForChannel(channelId))
    const currentUser = useAppSelector(selectUser)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (workspaceId && channelId) {
            dispatch(fetchMessages({ workspaceId, channelId }))
        }
    }, [workspaceId, channelId, dispatch])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages.length])

    if (messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center text-muted text-sm">
                <p>No messages yet — say hey! 👋</p>
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col gap-3 px-4 py-3 overflow-y-auto overflow-x-hidden">
            <AnimatePresence initial={false}>
                {messages.map((msg) => {
                    const isOwn = msg.senderId === currentUser?.id

                    return (
                        <motion.div
                            key={msg.id}
                            variants={messageVariants}
                            initial="hidden"
                            animate="visible"
                            className={`flex gap-2 items-end ${isOwn ? 'flex-row-reverse' : ''}`}
                        >
                            <ProfileAvatar fullName={msg.sender.fullName} profilePictureUrl={msg.sender.avatarUrl}/>
                            <div className="border flex">
                                <h3>akjdhjksadajkhsadhjakdsaalkdjaksdjlsakdjklsadjsakldjlsakdjklasdjklsadjklsadjklsadjklasdjakjdhjksadajkhsadhjakdsaalkdjaksdjlsakdjklsadjsakldjlsakdjklasdjklsadjklsadjklsadjklasdj</h3>
                            </div>
                            <span className="text-[10px] text-muted mt-0.5 px-1">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            {/*                             
                            <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                                {!isOwn && (
                                    <span className="text-caption text-muted mb-0.5 px-1">
                                        {msg.sender.fullName ?? 'Unknown'}
                                    </span>
                                )}
                                <div
                                    className={`px-4 py-2 rounded-2xl text-sm ${isOwn
                                        ? 'bg-linear-to-br from-[#3B9EFF] to-[#00D4E8] text-white rounded-br-sm'
                                        : 'bg-white/8 text-white rounded-bl-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>

                                {msg.reactions.length > 0 && (
                                    <div className="flex gap-1 mt-1">
                                        {Object.entries(
                                            msg.reactions.reduce((acc: Record<string, number>, r) => {
                                                acc[r.emoji] = (acc[r.emoji] ?? 0) + 1
                                                return acc
                                            }, {})
                                        ).map(([emoji, count]) => (
                                            <span key={emoji} className="bg-white/10 rounded-full px-2 py-0.5 text-xs">
                                                {emoji} {count}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <span className="text-[10px] text-muted mt-0.5 px-1">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div> */}
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            <div ref={bottomRef} />
        </div>
    )
}

export default ChannelView