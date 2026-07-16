import { useEffect } from "react"
import { setActiveChannelId as setWorkspaceActiveChannelId } from "../../store/slices/workspaceSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useParams } from "react-router"
import { selectChannelsForWorkspace } from "../../store/slices/channelSlice"
import { AppInput } from "../../components/shared/AppInput"
import { MessageIcon } from "../../components/icon"

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

    if (!channel) return null
    return (
        <div className="flex flex-col h-full">
            <div className="glass-card m-2 h-full flex flex-col relative">
                <div className="p-4 flex items-center gap-2">
                    <div className='inline-flex items-center justify-between bg-gradient-dark p-2 rounded-(--border-radius)'>
                        <MessageIcon color='var(--color-text-muted)' className='size-6' />
                    </div>
                    <div >
                        <h2># {channel.name}</h2>
                        <h2>{channel.description}</h2>
                    </div>

                </div>
                <div className="app-divider"></div>
                <div className="flex-1 overflow-auto"></div>
                <form className="pb-4 pt-1 px-4">
                    <AppInput placeholder={`Type in ${channel.name}`} />
                </form>
            </div>
        </div>
    )
}

export default ChannelView