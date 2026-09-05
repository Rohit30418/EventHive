import type { FC, ReactNode } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Preloader from "./common/Preloader";
import { useAuth } from "./dashboard/AuthContext";

interface Props {
  allowedRoles?: string[];
  children?: ReactNode;
}

const PrivateRoute: FC<Props> = ({ allowedRoles, children }) => {
  const { user, role, isApproved, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Preloader />;

  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  if (role === "Organizer" && isApproved !== true) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
