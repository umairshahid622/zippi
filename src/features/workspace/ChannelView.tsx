import { useEffect } from "react"
import { setActiveChannelId as setWorkspaceActiveChannelId } from "../../store/slices/workspaceSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useParams } from "react-router"
import { selectChannelsForWorkspace } from "../../store/slices/channelSlice"
import { AppInput } from "../../components/shared/AppInput"
import { ClipIcon, HashTagIcon, MessageIcon, SendIcon } from "../../components/icon"

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

    const onMessageSend = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    if (!channel) return null
    return (
        <div className="flex flex-col h-full">
            <div className="glass-card m-2 h-full flex flex-col relative">
                <div className="p-2 flex items-center gap-2">
                    <div className='inline-flex items-center justify-between bg-gradient-dark p-2 rounded-(--border-radius)'>
                        <MessageIcon color='var(--color-text-muted)' className='size-6' />
                    </div>
                    <div >
                        <div className="flex items-center gap-1"><HashTagIcon className="text-white" size={18} /> <h2 className="inline-flex">{channel.name}</h2></div>
                        <p className="text-muted">{channel.description}</p>
                    </div>

                </div>
                <div className="app-divider"></div>
                <div className="flex-1 overflow-auto"></div>
                <form onSubmit={onMessageSend} className="pb-4 pt-1 px-4">
                    <AppInput placeholder={`Type in ${channel.name}`}
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
        </div>
    )
}

export default ChannelView