import { useEffect } from "react"
import { Navigate, useParams } from "react-router"
import { fetchWorkspace, selectActiveWorkspace, selectIsLoadingActive } from "../../store/slices/workspaceSlice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import Loader from "../../components/shared/Loader"
import type { WorkspaceDetail } from "../../types/interface"

const WorkspaceRedirect = () => {
    const { workspaceId } = useParams()
    const dispatch = useAppDispatch()
    const activeWorkspace:WorkspaceDetail | null = useAppSelector(selectActiveWorkspace)
    const isLoadingActive = useAppSelector(selectIsLoadingActive)
    useEffect(() => {
        if (workspaceId) dispatch(fetchWorkspace(workspaceId))
    }, [workspaceId, dispatch])

    if (isLoadingActive || !activeWorkspace) {
        return <Loader variant="spinner" size="lg" />
    }

    const generalChannel =
        activeWorkspace.channels.find(c => c.name === 'general') ??
        activeWorkspace.channels[0]

    if (!generalChannel) {
        return <div>No channels in this workspace yet.</div>
    }
    console.log(activeWorkspace);
    

    return (
        <Navigate
            to={`/workspace/${workspaceId}/channel/${generalChannel.id}`}
            replace
        />
    )
}

export default WorkspaceRedirect