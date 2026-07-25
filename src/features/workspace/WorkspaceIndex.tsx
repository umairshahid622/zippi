import { Navigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { openModal, selectActiveModal, } from "../../store/slices/uiSlice"
import { selectHasNoWorkspaces, selectWorkspaceList } from "../../store/slices/workspaceSlice"
import type { WorkspaceListItem } from "../../types/interface"
import { PlusIcon, RocketIcon } from "../../components/icon"
import { useCallback, useEffect } from "react"
import ArrowExpandButton from "../../components/shared/ArrowExpandButton"



const PLUST_ICON = <PlusIcon className="size-4" />

const WorkspaceIndex = () => {
    const list: WorkspaceListItem[] = useAppSelector(selectWorkspaceList)
    const hasNoWorkspaces = useAppSelector(selectHasNoWorkspaces)
    const activeModal = useAppSelector(selectActiveModal)
    const dispatch = useAppDispatch();

    const openWorkSpaceModal = useCallback(() => {
        dispatch(openModal("CREATE_WORKSPACE_MODAL"))
    }, [dispatch])

    useEffect(() => {
        if (hasNoWorkspaces) {
            openWorkSpaceModal()
        }
    }, [hasNoWorkspaces, dispatch])

    if (hasNoWorkspaces) {
        return (
            <>
                {!activeModal && (
                    <section className="h-screen flex flex-col gap-3 items-center justify-center">
                        <div className="text-center space-y-1">
                            <h2>Create your first workspace</h2>
                            <p className="flex items-center gap-3">
                                This is where your team will chat, share files, and get things done.
                                <span><RocketIcon className="size-5 opacity-75" /></span>
                            </p>
                        </div>
                        <ArrowExpandButton onCallBack={openWorkSpaceModal} label={"Get Started"} className="w-auto px-8" icon={PLUST_ICON} />
                    </section>
                )}
            </>
        )
    }

    if (!list.length) {
        return null
    }

    return <Navigate to={`/workspace/${list[0].id}`} replace />
}

export default WorkspaceIndex