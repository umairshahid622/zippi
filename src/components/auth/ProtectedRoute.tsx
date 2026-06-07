// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { type RootState } from "../../store"; // Adjust path to your store

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated || !token) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};