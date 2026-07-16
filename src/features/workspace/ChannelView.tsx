import { useEffect } from "react"
import { fetchWorkspace, selectActiveWorkspace, setActiveChannelId } from "../../store/slices/workspaceSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useParams } from "react-router"

const ChannelView = () => {

    const { workspaceId, channelId } = useParams()
    const dispatch = useAppDispatch()
    const activeWorkspace = useAppSelector(selectActiveWorkspace)

    useEffect(() => {
        if (workspaceId && activeWorkspace?.id !== workspaceId) {
            dispatch(fetchWorkspace(workspaceId))
        }
    }, [workspaceId, activeWorkspace?.id, dispatch])

    useEffect(() => {
        if (channelId) dispatch(setActiveChannelId(channelId))
    }, [channelId, dispatch])

    const channel = activeWorkspace?.channels.find(c => c.id === channelId)
    if (!channel) return null
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 glass-card m-2 h-full">
                <h2># {channel.name}</h2>
            </div>
        </div>
    )
}

export default ChannelView