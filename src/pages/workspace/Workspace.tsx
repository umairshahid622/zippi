import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";

export default function WorkSpace() {
  const dispatch = useAppDispatch()
  const logOut = async () => {
    await dispatch(logout());
  }
  return (
    <div>
      <h1
        onClick={logOut}
      >WorkSpace</h1>
    </div>
  );
}