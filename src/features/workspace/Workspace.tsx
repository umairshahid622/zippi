
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logout } from "../../store/slices/authSlice";
import AppLogo from "../../components/common/AppLogo";
import AppButton from "../../components/common/AppButton";

export default function WorkSpace() {
  return (
    <main className="flex h-screen relative mx-auto overflow-x-hidden">
      <SideBar />

    </main>
  );
}

const SideBar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const logOut = async () => {
    await dispatch(logout());
  }
  return (
    <aside className="w-64 h-screen p-4 flex flex-col gap-6 border bg-black-pearl">
      <AppLogo title={user?.fullName || ""} />
      <AppButton label={"Logout"} onCallBack={logOut} />
    </aside>
  )
}