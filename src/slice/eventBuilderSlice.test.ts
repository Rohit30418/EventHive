import { describe, expect, it } from "vitest";
import reducer, {
  beginEventDraft,
  clearEventDraft,
  hydrateEventDraft,
  replaceDraftSpeakers,
  updateEventDraft,
} from "./eventBuilderSlice";

const scope = { ownerId: "organizer-one", editorKey: "edit:event-one" };

describe("eventBuilderSlice", () => {
  it("keeps a scoped draft when the same editor is reopened", () => {
    let state = reducer(undefined, beginEventDraft(scope));
    state = reducer(state, updateEventDraft({ ...scope, fields: { EventName: "Updated title" } }));
    state = reducer(state, beginEventDraft(scope));
    expect(state.fields.EventName).toBe("Updated title");
  });

  it("resets when switching to another event or organizer", () => {
    let state = reducer(undefined, beginEventDraft(scope));
    state = reducer(state, updateEventDraft({ ...scope, fields: { EventName: "Private title" } }));
    state = reducer(state, beginEventDraft({ ownerId: "organizer-two", editorKey: "new" }));
    expect(state.fields.EventName).toBeUndefined();
    expect(state.speakers).toEqual([]);
    expect(state.ownerId).toBe("organizer-two");
  });

  it("ignores stale updates from a different editor", () => {
    let state = reducer(undefined, beginEventDraft(scope));
    state = reducer(state, updateEventDraft({
      ownerId: "organizer-two", editorKey: scope.editorKey, fields: { EventName: "Wrong user" },
    }));
    expect(state.fields.EventName).toBeUndefined();
  });

  it("hydrates existing event data and shares speaker edits", () => {
    let state = reducer(undefined, beginEventDraft(scope));
    state = reducer(state, hydrateEventDraft({
      ...scope, fields: { EventName: "Original title" },
      speakers: [{ speakerName: "Original", speakerDesignation: "Host" }],
    }));
    state = reducer(state, replaceDraftSpeakers({
      ...scope, speakers: [{ speakerName: "Updated", speakerDesignation: "Guest" }],
    }));
    expect(state.fields.EventName).toBe("Original title");
    expect(state.speakers[0].speakerName).toBe("Updated");
  });

  it("clears in-memory drafts after publishing", () => {
    let state = reducer(undefined, beginEventDraft(scope));
    state = reducer(state, clearEventDraft());
    expect(state.ownerId).toBeNull();
    expect(state.editorKey).toBeNull();
    expect(state.fields.EventName).toBeUndefined();
  });
});
