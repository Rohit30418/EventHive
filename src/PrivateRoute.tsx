// src/PrivateRoute.tsx
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./dashboard/AuthContext"; // ⚠️ CHECK PATH

interface Props {
  allowedRoles?: string[]; // Optional: e.g. ["SuperAdmin"]
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const { user, role } = useAuth();
  const location = useLocation();

  // 1. Not Logged In? -> Go to Login
  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // 2. Logged In, but wrong role? -> Unauthorized
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // Make sure you have this route or send to "/"
  }

  // 3. Allowed! Render the content
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;