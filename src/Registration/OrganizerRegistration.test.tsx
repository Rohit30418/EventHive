import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OrganizerRegistration from "./OrganizerRegistration";

describe("OrganizerRegistration", () => {
  const renderPage = () => {
    render(
      <BrowserRouter>
        <OrganizerRegistration />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the required account fields", () => {
    renderPage();

    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
    expect(screen.getByLabelText("Company")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/I agree to the Terms and Privacy Policy/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors when the first step is submitted empty", async () => {
    renderPage();

    fireEvent.click(screen.getByRole("button", { name: /Proceed to Payment/i }));

    expect(
      await screen.findByText(/Full name must be at least 3 characters/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it("validates matching passwords", async () => {
    renderPage();

    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password1!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Password2!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Proceed to Payment/i }));

    expect(await screen.findByText(/Passwords don't match/i)).toBeInTheDocument();
  });
});
