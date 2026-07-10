import { Outlet } from "react-router";
import { AnimatedBackground } from "../../components/auth/AnimatedBackground";
import SideBar from "../../components/workspace/SideBar";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchWorkspaces, selectIsLoadingList } from "../../store/slices/workspaceSlice";
import { useEffect } from "react";
import Loader from "../../components/common/Loader";

export default function WorkSpace() {
  const dispatch = useAppDispatch()
  const isLoadingList = useAppSelector(selectIsLoadingList)

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  if (isLoadingList) {
    return <div className="flex h-screen w-screen items-center justify-center"><Loader variant="dots" size="lg" /></div>
  }

  return (
    <main className="flex h-screen relative mx-auto overflow-hidden">
      <SideBar />
      <section className="flex-1">
        <Outlet />
      </section>
      <AnimatedBackground />
    </main>
  );
}
