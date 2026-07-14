import { Navigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { openModal } from "../../store/slices/uiSlice"
import { selectHasNoWorkspaces, selectWorkspaceList } from "../../store/slices/workspaceSlice"

const WorkspaceIndex = () => {
    const list = useAppSelector(selectWorkspaceList)
    const hasNoWorkspaces = useAppSelector(selectHasNoWorkspaces)
    const dispatch = useAppDispatch();

    if (hasNoWorkspaces) {
        dispatch(openModal("CREATE_WORKSPACE_MODAL"))
    }
    return <Navigate to={`/workspace/${list[0].id}`} replace />
}

export default WorkspaceIndex