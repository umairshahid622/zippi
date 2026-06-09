// src/components/auth/PublicOnlyRoute.tsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../../store";
import { selectIsNewUser, selectAwaitingOtpAnimation } from "../../store/slices/authSlice";

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const isNewUser = useSelector((state: RootState) => selectIsNewUser(state));
  const awaitingOtpAnimation = useSelector((state: RootState) => selectAwaitingOtpAnimation(state));

  // Don't redirect while the OTP success animation is still playing
  if (isAuthenticated && token && !isNewUser && !awaitingOtpAnimation) {
    return <Navigate to="/workspace" replace />;
  }

  return <>{children}</>;
};