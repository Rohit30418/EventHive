import OrganizerDashboard from "./OrganizerAdmin/OrganizerDashboard";
import SuperAdminDashboard from "./SuperAdmin/SuperAdminDashboard";
import { useAuth } from "./AuthContext";

const MainDashboard = () => {
  const { role } = useAuth();

  if (role === "SuperAdmin") return <SuperAdminDashboard />;
  return <OrganizerDashboard />;
};

export default MainDashboard;
