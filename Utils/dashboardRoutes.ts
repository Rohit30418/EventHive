import React from "react";

// ==================== IMPORTS ====================
import ManageRequest from "../src/dashboard/SuperAdmin/ManageRequest"

import SuperAdminDashboard from "../src/dashboard/SuperAdmin/SuperAdminDashboard"

import CreateEvent from "../src/dashboard/CreateEvent"

import OrganizerDashboard from "../src/dashboard/OrganizerAdmin/OrganizerDashboard"

import AddwebsiteContentForm from "../src/dashboard/AddwebsiteContentForm"

import Events from "../src/dashboard/Events"

import EventRegistrationsTable from "../src/dashboard/EventRegistrationsTable"

// ==================== TYPE DEFINITION ====================
export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  roles: string[]; // "SuperAdmin" | "Organizer"
}

// ==================== ROUTE CONFIGURATION ====================
export const dashboardRoutes: RouteConfig[] = [
  
  // ------------------ SUPER ADMIN ROUTES ------------------
  {
    path: "SuperAdmin",
    component: SuperAdminDashboard,
    roles: ["SuperAdmin"], // 🔒 Exclusive to Super Admin
  },
  {
    path: "ManageRequest",
    component: ManageRequest,
    roles: ["SuperAdmin"], // 
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
    roles: ["SuperAdmin","Organizer"], // View My Events
  },
  {
    path: "Registrations",
    component: EventRegistrationsTable,
    roles: ["SuperAdmin","Organizer"], // View My Attendees
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
    roles: ["SuperAdmin", "Organizer"], // Both can create events
  },
  {
    // ⚠️ Dynamic Route for Editing
    path: "EditEvent/:EventID",
    component: CreateEvent,
    roles: ["SuperAdmin", "Organizer"],
  },
];