import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

export default function WorkSpace() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const logOut = async () => {
    await dispatch(logout());
  }
  return (
    <div>
      <h1
        onClick={logOut}
      >WorkSpace {user?.fullName} {isAuthenticated ? "Authencitacted":"Not"}</h1>
    </div>
  );
}