import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchEvents } from "./useGetEvents";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(axios.get);

describe("fetchEvents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("converts the Firebase event object into a typed array", async () => {
    mockedGet.mockResolvedValue({
      data: {
        eventA: {
          EventName: "React Conference",
          eventDate: "2026-11-10",
          location: "Bengaluru",
        },
        eventB: {
          EventName: "Design Meetup",
          eventDate: "2026-12-01",
          location: "Delhi",
        },
      },
    });

    await expect(fetchEvents()).resolves.toEqual([
      {
        id: "eventA",
        EventName: "React Conference",
        eventDate: "2026-11-10",
        location: "Bengaluru",
      },
      {
        id: "eventB",
        EventName: "Design Meetup",
        eventDate: "2026-12-01",
        location: "Delhi",
      },
    ]);
  });

  it("returns an empty array when Firebase has no events", async () => {
    mockedGet.mockResolvedValue({ data: null });

    await expect(fetchEvents()).resolves.toEqual([]);
  });
});
