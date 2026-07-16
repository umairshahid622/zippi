import { Outlet, useParams } from "react-router";
import { AnimatedBackground } from "../../components/auth/AnimatedBackground";
import SideBar from "../../components/workspace/SideBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchWorkspace, fetchWorkspaces, selectIsLoadingList } from "../../store/slices/workspaceSlice";
import { useEffect } from "react";
import Loader from "../../components/shared/Loader";
import WorkspaceRail from "../../components/workspace/WorkspaceRail";
import { ModalManager } from "../../components/modal/ModalManager";
import { fetchChannels } from "../../store/slices/channelSlice";

export default function WorkSpace() {
  const dispatch = useAppDispatch()
  const { workspaceId } = useParams()
  const isLoadingList = useAppSelector(selectIsLoadingList)

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchWorkspace(workspaceId))
      dispatch(fetchChannels(workspaceId))
    }
  }, [workspaceId, dispatch])

  if (isLoadingList) {
    return <div className="flex h-screen w-screen items-center justify-center"><Loader variant="dots" size="lg" /></div>
  }

  return (
    <main className="flex h-screen relative mx-auto overflow-hidden">
      <WorkspaceRail />
      <SideBar />
      <section className="flex-1">
        <Outlet />
      </section>
      <AnimatedBackground />
      <ModalManager />
    </main>
  );
}
