
import { Navigate, useParams } from "react-router"
import { useAppSelector } from "../../hooks/hooks"
import Loader from "../../components/shared/Loader"
import { selectChannelsForWorkspace, selectChannelsLoading } from "../../store/slices/channelSlice"

const WorkspaceRedirect = () => {
    const { workspaceId } = useParams()
    const channels = useAppSelector(selectChannelsForWorkspace(workspaceId ?? null))
    const isLoading = useAppSelector(selectChannelsLoading)

    if (isLoading && channels.length === 0) {
        return <Loader variant="spinner" size="lg" />
    }

    const general = channels.find(c => c.name === 'general') ?? channels[0]

    if (!general) return <div>No channels in this workspace yet.</div>

    return <Navigate to={`/workspace/${workspaceId}/channel/${general.id}`} replace />
}

export default WorkspaceRedirect