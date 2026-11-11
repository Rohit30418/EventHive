import { beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { fetchRegistrations } from "./useGetRegistrations";

// All tests use a simulated user/token and no network connection.
vi.mock("../Firebase", () => ({
  auth: { currentUser: { uid: "organizer-1", getIdToken: vi.fn(async () => "test-token") } },
}));
vi.mock("axios", () => ({ default: { get: vi.fn() } }));

const get = vi.mocked(axios.get);

describe("fetchRegistrations access scope", () => {
  beforeEach(() => get.mockReset());

  it("only reads an organizer's selected event subtrees", async () => {
    get.mockImplementation(async (url) => ({
      data: url.includes("/event-a.json") ? { "reg-1": { fullName: "A" } } : {},
    } as never));

    const data = await fetchRegistrations("organizer-1", "Organizer", ["event-a"]);
    expect(data).toEqual([{ eventId: "event-a", regId: "reg-1", fullName: "A" }]);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get.mock.calls[0][0]).toContain("/Registrations/event-a.json?auth=test-token");
  });

  it("allows the SuperAdmin collection request", async () => {
    get.mockResolvedValueOnce({
      data: { "event-a": { "reg-1": { fullName: "A" } } },
    } as never);
    const data = await fetchRegistrations("organizer-1", "SuperAdmin");
    expect(data).toHaveLength(1);
    expect(get.mock.calls[0][0]).toContain("/Registrations.json?auth=test-token");
  });

  it("denies unsupported roles without reading registration records", async () => {
    await expect(fetchRegistrations("organizer-1", "User", ["event-a"]))
      .rejects.toThrow("permission");
    expect(get).not.toHaveBeenCalled();
  });

  it("rejects a mismatched user identity", async () => {
    await expect(fetchRegistrations("different-uid", "Organizer", ["event-a"]))
      .rejects.toThrow("logged in");
    expect(get).not.toHaveBeenCalled();
  });
});
