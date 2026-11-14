import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MicrositeEvent, Speaker } from "../Types/eventType";

// Redux stores an unsaved UI draft, never the published event cache.
// The draft belongs to one authenticated organizer and one event editor.
export type EventDraftFields = Partial<
  Pick<
    MicrositeEvent,
    | "EventName"
    | "eventDate"
    | "location"
    | "eventType"
    | "banner"
    | "BannerTagLine"
    | "AboutArea"
    | "PrimaryColor"
    | "SecondaryColor"
  >
>;

interface EventBuilderState {
  ownerId: string | null;
  editorKey: string | null;
  fields: EventDraftFields;
  speakers: Speaker[];
}

export const emptyEventFields: EventDraftFields = {
  PrimaryColor: "#3848BE",
  SecondaryColor: "#13B785",
};

const initialState: EventBuilderState = {
  ownerId: null,
  editorKey: null,
  fields: { ...emptyEventFields },
  speakers: [],
};

type Scope = { ownerId: string; editorKey: string };
type FieldUpdate = Scope & { fields: EventDraftFields };
type SpeakersUpdate = Scope & { speakers: Speaker[] };

const eventBuilderSlice = createSlice({
  name: "eventBuilder",
  initialState,
  reducers: {
    beginEventDraft: (state, action: PayloadAction<Scope>) => {
      const { ownerId, editorKey } = action.payload;
      if (state.ownerId === ownerId && state.editorKey === editorKey) return;
      state.ownerId = ownerId;
      state.editorKey = editorKey;
      state.fields = { ...emptyEventFields };
      state.speakers = [];
    },
    hydrateEventDraft: (state, action: PayloadAction<FieldUpdate & { speakers: Speaker[] }>) => {
      const { ownerId, editorKey, fields, speakers } = action.payload;
      if (state.ownerId !== ownerId || state.editorKey !== editorKey) return;
      state.fields = { ...emptyEventFields, ...fields };
      state.speakers = speakers;
    },
    updateEventDraft: (state, action: PayloadAction<FieldUpdate>) => {
      const { ownerId, editorKey, fields } = action.payload;
      if (state.ownerId !== ownerId || state.editorKey !== editorKey) return;
      Object.assign(state.fields, fields);
    },
    replaceDraftSpeakers: (state, action: PayloadAction<SpeakersUpdate>) => {
      const { ownerId, editorKey, speakers } = action.payload;
      if (state.ownerId !== ownerId || state.editorKey !== editorKey) return;
      state.speakers = speakers;
    },
    clearEventDraft: () => initialState,
  },
});

export const {
  beginEventDraft,
  hydrateEventDraft,
  updateEventDraft,
  replaceDraftSpeakers,
  clearEventDraft,
} = eventBuilderSlice.actions;

export default eventBuilderSlice.reducer;
