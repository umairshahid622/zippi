
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout, selectAuthLoading } from "../../store/slices/authSlice";
import AppLogo from "../../components/common/AppLogo";
import AppButton from "../../components/common/AppButton";
import { AnimatedBackground } from "../../components/auth/AnimatedBackground";
import LiquidGlassCard from "../../components/common/LiquidGlassCard";

export default function WorkSpace() {
  return (
    <main className="flex h-screen relative mx-auto overflow-x-hidden">
      <AnimatedBackground />
      <SideBar />

    </main>
  );
}

const SideBar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isLoading = useAppSelector(selectAuthLoading)
  const dispatch = useAppDispatch()

  const logOut = async () => {
    await dispatch(logout());
  }
  return (
    <aside className="w-64 m-2 p-0 flex flex-col">
      <LiquidGlassCard className="flex flex-col flex-1">
        <div className="p-4">
          <AppLogo />

        </div>
        <div className="flex-1 p-4">
          <AppButton label={"Logout"} onCallBack={logOut} isLoading={isLoading} isDisabled={isLoading} />
        </div>
        <div className="p-4 flex">

          <p>
            {user?.fullName}
          </p>
        </div>
      </LiquidGlassCard>

    </aside>
  )
}