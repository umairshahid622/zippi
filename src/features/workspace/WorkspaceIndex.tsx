import { Navigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { openModal } from "../../store/slices/uiSlice"
import { selectHasNoWorkspaces, selectWorkspaceList } from "../../store/slices/workspaceSlice"
import type { WorkspaceListItem } from "../../types/interface"

const WorkspaceIndex = () => {
    const list: WorkspaceListItem[] = useAppSelector(selectWorkspaceList)
    const hasNoWorkspaces = useAppSelector(selectHasNoWorkspaces)
    const dispatch = useAppDispatch();

    if (hasNoWorkspaces) {
        dispatch(openModal("CREATE_WORKSPACE_MODAL"))
        return null
    }

    if (!list.length) {
        return null
    }

    return <Navigate to={`/workspace/${list[0].id}`} replace />
}

export default WorkspaceIndex