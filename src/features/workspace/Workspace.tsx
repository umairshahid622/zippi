import { Outlet, useParams } from "react-router";
import { AnimatedBackground } from "../../components/auth/AnimatedBackground";
import SideBar from "../../components/workspace/SideBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchWorkspace, fetchWorkspaces, selectIsLoadingList } from "../../store/slices/workspaceSlice";
import { useEffect } from "react";
import Loader from "../../components/shared/Loader";
import WorkspaceRail from "../../components/workspace/WorkspaceRail";
import { ModalManager } from "../../components/modal/ModalManager";
import ConnectionBanner from "../../components/shared/ConnectionBanner";
import { fetchChannels } from "../../store/slices/channelSlice";
import { getSocket } from "../../lib/socket";
import { messageDeleted, messageUpdated, receiveMessage } from "../../store/slices/messageSlice";

export default function WorkSpace() {
  const dispatch = useAppDispatch()
  const { workspaceId } = useParams()
  const isLoadingList = useAppSelector(selectIsLoadingList)

  useEffect(() => {
    const socket = getSocket()

    socket.on('message:new', (msg) => dispatch(receiveMessage(msg)))
    socket.on('message:updated', (msg) => dispatch(messageUpdated(msg)))
    socket.on('message:deleted', (data) => dispatch(messageDeleted(data)))

    return () => {
      socket.off('message:new')
      socket.off('message:updated')
      socket.off('message:deleted')
    }
  }, [dispatch])

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
      <section className="flex-1 flex-col border m-2 glass-card overflow-hidden">
        <Outlet />
      </section>
      <AnimatedBackground />
      <ModalManager />
      <ConnectionBanner />
    </main>
  );
}
