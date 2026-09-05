import React, { lazy } from "react";

// ==================== LAZY IMPORTS ====================

const ManageRequest = lazy(
  () => import("../src/dashboard/SuperAdmin/ManageRequest")
);

const SuperAdminDashboard = lazy(
  () => import("../src/dashboard/SuperAdmin/SuperAdminDashboard")
);

const CreateEvent = lazy(
  () => import("../src/dashboard/CreateEvent")
);

const OrganizerDashboard = lazy(
  () => import("../src/dashboard/OrganizerAdmin/OrganizerDashboard")
);

const AddwebsiteContentForm = lazy(
  () => import("../src/dashboard/AddwebsiteContentForm")
);

const Events = lazy(
  () => import("../src/dashboard/Events")
);

const EventRegistrationsTable = lazy(
  () => import("../src/dashboard/EventRegistrationsTable")
);

// ==================== TYPE DEFINITION ====================

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  roles: string[];
}

// ==================== ROUTE CONFIGURATION ====================

export const dashboardRoutes: RouteConfig[] = [
  // ------------------ SUPER ADMIN ROUTES ------------------
  {
    path: "SuperAdmin",
    component: SuperAdminDashboard,
    roles: ["SuperAdmin"],
  },
  {
    path: "ManageRequest",
    component: ManageRequest,
    roles: ["SuperAdmin"],
  },

  // ------------------ ORGANIZER ROUTES ------------------
  {
    path: "OrganizerAdmin",
    component: OrganizerDashboard,
    roles: ["Organizer"],
  },
  {
    path: "Events",
    component: Events,
    roles: ["SuperAdmin", "Organizer"],
  },
  {
    path: "Registrations",
    component: EventRegistrationsTable,
    roles: ["SuperAdmin", "Organizer"],
  },
  {
    path: "AddWebsiteContent",
    component: AddwebsiteContentForm,
    roles: ["Organizer"],
  },

  // ------------------ SHARED / COMMON ROUTES ------------------
  {
    path: "CreateEvent",
    component: CreateEvent,
    roles: ["SuperAdmin", "Organizer"],
  },
  {
    path: "EditEvent/:EventID",
    component: CreateEvent,
    roles: ["SuperAdmin", "Organizer"],
  },
];
