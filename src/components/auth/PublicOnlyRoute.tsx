// src/components/auth/PublicOnlyRoute.tsx
import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAppSelector } from "../../hooks/hooks";
import type { RootState } from "../../store";
import { selectIsNewUser } from "../../store/slices/authSlice";

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const isNewUser = useAppSelector((state: RootState) => selectIsNewUser(state));

  // Don't redirect while the OTP success animation is still playing
  if (token && !isNewUser) {
    return <Navigate to="/workspace" replace />;
  }

  return <>{children}</>;
};