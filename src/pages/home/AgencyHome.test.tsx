import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import type { EventType } from "../../Types/eventType";
import AgencyHome from "./AgencyHome";

function show(events: EventType[] = []) {
  return render(<MemoryRouter initialEntries={["/"]}>
    <AgencyHome featuredEvents={events} isLoading={false} error={null} />
  </MemoryRouter>);
}

describe("EventHive agency marketing page", () => {
  it("shows the requested organiser outcome, a real creation link and honest proof section", () => {
    show();
    expect(screen.getByRole("heading", { level: 1, name: "Fill your next event in days, not weeks." })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Create free event/i })[0]).toHaveAttribute("href", "/OrganizerRegistration");
    expect(screen.getByRole("heading", { name: /We want to hear from people doing the actual work/i })).toBeInTheDocument();
    expect(screen.queryByText("Sample story")).not.toBeInTheDocument();
  });

  it("keeps event-card links connected to the original published microsite route", () => {
    show([{
      id: "sample-id",
      EventName: "Community Meetup",
      eventDate: "2027-01-16",
      location: "Pune",
    }]);
    const link = screen.getByRole("link", { name: /View event/i });
    expect(link.getAttribute("href")).toContain("/events/");
    expect(link.getAttribute("href")).toContain("/sample-id");
  });

  it("reserves a labelled artwork frame rather than loading a stock event poster", () => {
    show([{
      id: "sample-id",
      EventName: "Community Meetup",
      eventDate: "2027-01-16",
      location: "Pune",
    }]);
    expect(screen.getByRole("img", { name: /Event poster artwork will appear here/i })).toBeInTheDocument();
  });
});
