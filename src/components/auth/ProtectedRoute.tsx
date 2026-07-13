// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router";
import type { ReactNode } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsAuthenticated, selectIsNewUser } from "../../store/slices/authSlice";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const authenticated =  useAppSelector(selectIsAuthenticated)
  const isNewUser = useAppSelector(selectIsNewUser)
  const location = useLocation();

  if (!authenticated || isNewUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};