import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { User } from "firebase/auth";
import { beforeEach, describe, expect, it, vi } from "vitest";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "./dashboard/AuthContext";

vi.mock("./dashboard/AuthContext", () => ({
  useAuth: vi.fn(),
}));

const mockedUseAuth = vi.mocked(useAuth);
const user = { uid: "user-1" } as User;
const logout = vi.fn(async () => undefined);

const renderProtectedRoute = (allowedRoles?: string[]) => {
  render(
    <MemoryRouter initialEntries={["/Dashboard"]}>
      <Routes>
        <Route path="/Login" element={<div>Login page</div>} />
        <Route path="/unauthorized" element={<div>Unauthorized page</div>} />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute allowedRoles={allowedRoles}>
              <div>Protected content</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe("PrivateRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects unauthenticated users to login", () => {
    mockedUseAuth.mockReturnValue({ user: null, role: null, loading: false, logout });

    renderProtectedRoute(["Organizer"]);

    expect(screen.getByText("Login page")).toBeInTheDocument();
  });

  it("redirects users without an allowed role", () => {
    mockedUseAuth.mockReturnValue({ user, role: "Organizer", loading: false, logout });

    renderProtectedRoute(["SuperAdmin"]);

    expect(screen.getByText("Unauthorized page")).toBeInTheDocument();
  });

  it("renders protected content for an allowed role", () => {
    mockedUseAuth.mockReturnValue({ user, role: "Organizer", loading: false, logout });

    renderProtectedRoute(["Organizer"]);

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });
});
