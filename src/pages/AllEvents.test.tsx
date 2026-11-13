import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGetEvent from "../AdminCustomHooks/useGetEvents";
import AllEvents from "./AllEvents";
import type { EventType } from "../Types/eventType";

vi.mock("../AdminCustomHooks/useGetEvents", () => ({ default: vi.fn() }));

const sampleEvents: EventType[] = [
  { id: "design-01", EventName: "Design Meetup Bengaluru", eventDate: "2099-05-01", eventType: "Art", location: "Bengaluru" },
  { id: "tech-02", EventName: "Technology Conference", eventDate: "2099-06-04", eventType: "Technology", location: "Delhi" },
  { id: "music-03", EventName: "Music in Pune", eventDate: "2020-04-15", eventType: "Music", location: "Pune" },
];

function showPage() {
  return render(<MemoryRouter><AllEvents /></MemoryRouter>);
}

beforeEach(() => {
  vi.mocked(useGetEvent).mockReturnValue({
    data: sampleEvents,
    isLoading: false,
    error: null,
    isFetching: false,
    refetch: vi.fn(),
  } as unknown as ReturnType<typeof useGetEvent>);
});

describe("EventHive Events directory", () => {
  it("renders the reference-inspired hero and links actual Firebase events to microsites", () => {
    showPage();
    expect(screen.getByRole("heading", { level: 1, name: /Find an event worth showing up for/i })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Design Meetup Bengaluru" })).toHaveLength(2);
    const events = screen.getAllByRole("article");
    expect(events).toHaveLength(3);
    expect(within(events[0]).getByRole("link", { name: /View event details/i }))
      .toHaveAttribute("href", "/events/design-meetup-bengaluru/design-01");
    expect(screen.queryByText("EventHive picks")).not.toBeInTheDocument();
  });

  it("keeps time and category filters usable", () => {
    showPage();
    fireEvent.click(screen.getByRole("button", { name: /^Past/ }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Music in Pune" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^All events/ }));
    fireEvent.click(screen.getByRole("button", { name: "Technology" }));
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Technology Conference" })).toBeInTheDocument();
  });

  it("searches names and cities and offers a way to reset an empty result", () => {
    showPage();
    fireEvent.change(screen.getByRole("searchbox", { name: /Search events by name/i }), { target: { value: "nonexistent event" } });
    expect(screen.getByText(/No matching events right now/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /See all events/i }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    fireEvent.change(screen.getByRole("searchbox", { name: /Search events by name/i }), { target: { value: "Delhi" } });
    expect(screen.getAllByRole("article")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: "Technology Conference" })).toBeInTheDocument();
  });
});
