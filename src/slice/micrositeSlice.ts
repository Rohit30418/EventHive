import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MicrositeEvent } from "../Types/eventType";

interface MicrositeState {
  eventData: MicrositeEvent | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MicrositeState = {
  eventData: null,
  isLoading: false,
  error: null,
};

const micrositeSlice = createSlice({
  name: "microsite",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addEventData: (state, action: PayloadAction<MicrositeEvent>) => {
      state.eventData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addEventData, setLoading, setError } = micrositeSlice.actions;
export default micrositeSlice.reducer;
