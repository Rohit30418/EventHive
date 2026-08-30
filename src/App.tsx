import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider, { useAuth } from "./dashboard/AuthContext";
import {
  dashboardRoutes,
  type RouteConfig,
} from "../Utils/dashboardRoutes";

import Preloader from "./common/Preloader";
import PrivateRoute from "./PrivateRoute";

// Layouts
const Mainlayout = lazy(() => import("./Layout/Mainlayout"));
const DashboardLayout = lazy(() => import("./Layout/DashboardLayout"));
const MicrositeLayout = lazy(() => import("./Layout/MicrositeLayout"));

// Public pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Logout = lazy(() => import("./pages/Logout"));

const OrganizerRegistration = lazy(
  () => import("./Registration/OrganizerRegistration")
);

const AllEvents = lazy(() => import("./pages/AllEvents"));

const EventRegistration = lazy(
  () => import("./pages/EventRegistration")
);

const MicrositeHome = lazy(
  () => import("./pages/Microsite/MicrositeHome")
);

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

const DashboardRedirect = () => {
  const { role, loading } = useAuth();

  if (loading) {
    return <Preloader />;
  }

  if (role === "SuperAdmin") {
    return <Navigate to="SuperAdmin" replace />;
  }

  if (role === "Organizer") {
    return <Navigate to="OrganizerAdmin" replace />;
  }

  return <Navigate to="/Login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Preloader />}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          toastClassName="!rounded-2xl !font-bold"
        />

        <Routes>
          {/* PUBLIC WEBSITE */}
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Home />} />

            <Route
              path="Login"
              element={<Login />}
            />

            <Route
              path="Logout"
              element={<Logout />}
            />

            <Route
              path="OrganizerRegistration"
              element={<OrganizerRegistration />}
            />

            <Route
              path="OrgniserRegistration"
              element={
                <Navigate
                  to="/OrganizerRegistration"
                  replace
                />
              }
            />

            <Route
              path="Events"
              element={<AllEvents />}
            />

            <Route
              path="EventRegistration"
              element={<EventRegistration />}
            />
          </Route>

          {/* EVENT MICROSITE */}
          <Route
            path="/events/:slug/:id"
            element={<MicrositeLayout />}
          >
            <Route
              index
              element={<MicrositeHome />}
            />
          </Route>

          {/* DASHBOARD */}
          <Route
            path="Dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route
              index
              element={<DashboardRedirect />}
            />

            {dashboardRoutes.map(
              (route: RouteConfig, index: number) => {
                const Component = route.component;

                return (
                  <Route
                    key={`${route.path}-${index}`}
                    path={route.path}
                    element={
                      <PrivateRoute
                        allowedRoles={route.roles}
                      >
                        <Component />
                      </PrivateRoute>
                    }
                  />
                );
              }
            )}
          </Route>

          <Route
            path="/unauthorized"
            element={<Unauthorized />}
          />

          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;