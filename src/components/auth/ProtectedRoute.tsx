// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import { type RootState } from "../../store";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsNewUser } from "../../store/slices/authSlice";

export const ProtectedRoute = ({ children }: {children:ReactNode}) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const isNewUser = useAppSelector(selectIsNewUser)
  const location = useLocation();

  if (!isAuthenticated || !token || isNewUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};