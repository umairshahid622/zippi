// src/components/auth/PublicOnlyRoute.tsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";

export const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useSelector((state: any) => state.auth);

  if (isAuthenticated && token) {
    return <Navigate to="/workspace" replace />;
  }

  return <>{children}</>;
};