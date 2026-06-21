// src/components/auth/PublicOnlyRoute.tsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../../store";
import { selectIsNewUser } from "../../store/slices/authSlice";

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const isNewUser = useSelector((state: RootState) => selectIsNewUser(state));

  // Don't redirect while the OTP success animation is still playing
  if (token && !isNewUser) {
    return <Navigate to="/workspace" replace />;
  }

  return <>{children}</>;
};