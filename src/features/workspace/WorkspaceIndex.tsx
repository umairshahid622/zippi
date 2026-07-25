import { Navigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { openModal, selectActiveModal, } from "../../store/slices/uiSlice"
import { selectHasNoWorkspaces, selectWorkspaceList } from "../../store/slices/workspaceSlice"
import type { WorkspaceListItem } from "../../types/interface"
import { RocketIcon } from "../../components/icon"

const WorkspaceIndex = () => {
    const list: WorkspaceListItem[] = useAppSelector(selectWorkspaceList)
    const hasNoWorkspaces = useAppSelector(selectHasNoWorkspaces)
    // const activeModal = useAppSelector(selectActiveModal)
    const dispatch = useAppDispatch();

    if (hasNoWorkspaces) {
        dispatch(openModal("CREATE_WORKSPACE_MODAL"))
        return (
            <>
                {true && (
                    <section className="h-screen flex flex-col items-center justify-center" >
                        <h2>Create your first workspace</h2>
                        <p className="flex items-center gap-3">This is where your team will chat, share files, and get things done. <span><RocketIcon className="size-5 opacity-75" /></span></p>

                    </section >
                )
                }
            </>
        )
    }

    if (!list.length) {
        return null
    }

    return <Navigate to={`/workspace/${list[0].id}`} replace />
}

export default WorkspaceIndex