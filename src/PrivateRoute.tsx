import { Navigate, useLocation, Outlet } from "react-router-dom";
import Preloader from "./common/Preloader"; // Reusing your preloader
import { useAuth } from "./dashboard/AuthContext"; 

interface Props {
  allowedRoles?: string[];
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ allowedRoles, children }) => {
const { user, role, loading } = useAuth(); 
const location = useLocation();

if (loading) {
return <Preloader />; 
}

  // 2. AUTHENTICATION CHECK
  // If loading is done and there is still no user, kick them out.
  if (!user) {
    // Redirect them to login, but remember where they were trying to go
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // 3. AUTHORIZATION CHECK (RBAC)
  // If the route has specific roles, and the user's role isn't in the list...
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Redirect to a 403 page or the Dashboard home
    return <Navigate to="/unauthorized" replace />; 
  }

  // 4. ACCESS GRANTED
  // Render the protected component (children) or the nested routes (Outlet)
   return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;