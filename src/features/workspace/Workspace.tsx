import { Outlet } from "react-router";
import { AnimatedBackground } from "../../components/auth/AnimatedBackground";
import SideBar from "../../components/workspace/SideBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchWorkspaces, selectIsLoadingList, selectWorkspaceList } from "../../store/slices/workspaceSlice";
import { useEffect } from "react";
import Loader from "../../components/shared/Loader";
import WorkspaceRail from "../../components/workspace/WorkspaceRail";
import { ModalManager } from "../../components/modal/ModalManager";

export default function WorkSpace() {
  const dispatch = useAppDispatch()
  const isLoadingList = useAppSelector(selectIsLoadingList)
  const list = useAppSelector(selectWorkspaceList)

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  if (isLoadingList) {
    return <div className="flex h-screen w-screen items-center justify-center"><Loader variant="dots" size="lg" /></div>
  }

  console.log(list);

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
