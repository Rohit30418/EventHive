import  { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// --- CONTEXT & UTILS ---
import AuthProvider, { useAuth } from "./dashboard/AuthContext";
import { dashboardRoutes, type RouteConfig } from "../Utils/dashboardRoutes"; 
// --- LAYOUTS ---
import Mainlayout from "./Layout/Mainlayout";
import DashboardLayout from "./Layout/DashboardLayout";
import MicrositeLayout from "./Layout/MicrositeLayout"; // If you have this

// --- COMPONENTS ---
import Preloader from "./common/Preloader"; // Or use a simple <div>Loading...</div>
import PrivateRoute from "./PrivateRoute";

// --- LAZY LOADING PAGES ---
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const OrgniserRegistration = lazy(() => import("./Registration/OrgniserRegistration"));
const AllEvents = lazy(() => import("./pages/AllEvents"));
const EventRegistration = lazy(() => import("./pages/EventRegistration"));
const MicrositeHome = lazy(() => import("./pages/Microsite/MicositeHome"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Unauthorized=lazy(()=>import("./pages/Unauthorized"));

// ------------------- SMART REDIRECT COMPONENT -------------------
// This decides where a user goes when they hit "/Dashboard" directly
const DashboardRedirect = () => {
  const { role,loading } = useAuth();
  if (loading) {
    return <Preloader />; 
  }
  if (role === "SuperAdmin") return <Navigate to="SuperAdmin" replace />;
  if (role === "Organizer") return <Navigate to="OrganizerAdmin" replace />;
  return <Navigate to="/Login" replace />;
};

// ------------------- MAIN APP COMPONENT -------------------
function App() {
  return (
      <AuthProvider>
    <Suspense fallback={<Preloader />}>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      {/* 1. Global Auth Provider wraps the whole app */}
    
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="OrgniserRegistration" element={<OrgniserRegistration />} />
            <Route path="Events" element={<AllEvents />} />
            <Route path="EventRegistration" element={<EventRegistration />} />
          </Route>

          {/* ================= MICROSITE ROUTES (Public Event Pages) ================= */}
          <Route path="Event/:id" element={<MicrositeLayout />}>
            <Route index element={<MicrositeHome />} />
          </Route>

          {/* ================= PROTECTED DASHBOARD ROUTES ================= */}
         
          <Route 
            path="Dashboard" 
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            {/* Index: Redirects to the correct sub-page based on role */}
            <Route index element={<DashboardRedirect />} />
            
            {/* Level 2 Security: The Specific Pages */}
            {dashboardRoutes.map((route: RouteConfig, index: number) => {
              const Component = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute allowedRoles={route.roles}>
                      <Component />
                    </PrivateRoute>
                  }
                />
              );
            })}
          </Route>

          {/* ================= 404 CATCH ALL ================= */}
          <Route path="*" element={<ErrorPage />} />
          <Route path="/unauthorized" element={<Unauthorized></Unauthorized>}></Route>
        </Routes> 
    </Suspense>
      </AuthProvider>
  );
}

export default App;