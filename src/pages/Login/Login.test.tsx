import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { toast } from "react-toastify";
import Login from "./Login";

vi.mock("../../Firebase", () => ({ auth: {} }));
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}));

describe("EventHive Login logout feedback", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows a logged-out popup after a successful dashboard sign-out", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/Login", state: { logoutSuccess: true } }]}>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("You are logged out.");
      expect(toast.success).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByRole("heading", { name: "Welcome back." })).toBeInTheDocument();
  });

  it("does not claim logout success on an ordinary visit to Login", () => {
    render(
      <MemoryRouter initialEntries={["/Login"]}>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
    expect(toast.success).not.toHaveBeenCalled();
  });
});
