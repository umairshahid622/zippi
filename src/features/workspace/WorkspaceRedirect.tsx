import { useEffect } from "react"
import { Navigate, useParams } from "react-router"
import { fetchWorkspace, selectActiveWorkspace, selectIsLoadingActive } from "../../store/slices/workspaceSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import Loader from "../../components/shared/Loader"
import type { WorkspaceDetail } from "../../types/interface"

const WorkspaceRedirect = () => {
    const { workspaceId } = useParams()
    const dispatch = useAppDispatch()
    const activeWorkspace: WorkspaceDetail | null = useAppSelector(selectActiveWorkspace)
    const isLoadingActive = useAppSelector(selectIsLoadingActive)
    useEffect(() => {
        console.log("Fetch WorkSpace Called");

        if (workspaceId) dispatch(fetchWorkspace(workspaceId))
    }, [workspaceId, dispatch])

    if (isLoadingActive || !activeWorkspace || activeWorkspace.id !== workspaceId) {
        return <div className="flex items-center justify-center h-screen"><Loader variant="dots" size="lg" /> </div>
    }

    const preferredChannel =
        activeWorkspace.channels.find(c => c.name === 'general') ??
        activeWorkspace.channels[0]

    if (!preferredChannel) {
        return <div className="flex items-center justify-center">
            <h3>No channels in this workspace yet.</h3>
        </div>
    }

    return (
        <Navigate
            to={`/workspace/${workspaceId}/channel/${preferredChannel.id}`}
            replace
        />
    )
}

export default WorkspaceRedirect