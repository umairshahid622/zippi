// src/components/auth/PublicOnlyRoute.tsx
import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsAuthenticated, selectIsNewUser } from "../../store/slices/authSlice";

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const authenticated =  useAppSelector(selectIsAuthenticated)
  const isNewUser = useAppSelector(selectIsNewUser);

  // Don't redirect while the OTP success animation is still playing
  if (authenticated && !isNewUser) {
    return <Navigate to="/workspace" replace />;
  }

  return <>{children}</>;
};