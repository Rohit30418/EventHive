import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import EventCard from "./EventCard";
import type { EventType } from "../Types/eventType";

const event: EventType = {
  id: "event-123",
  EventName: "Frontend Summit 2026",
  eventDate: "2026-10-12",
  location: "New Delhi",
  eventType: "Technology",
  BannerTagLine: "Build better web experiences",
};

describe("EventCard", () => {
  it("renders event details and links to the public event page", () => {
    render(
      <MemoryRouter>
        <EventCard event={event} index={0} />
      </MemoryRouter>
    );

    expect(screen.getByText("Frontend Summit 2026")).toBeInTheDocument();
    expect(screen.getByText("New Delhi")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View Event/i })).toHaveAttribute(
      "href",
      "/Event/event-123"
    );
  });
});
