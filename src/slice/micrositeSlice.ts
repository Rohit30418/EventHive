import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 1. Define the Shape of your Event Data (The Contract)
// Export this so you can use it in axios.get<EventData>
export interface EventData {
  eventId: string;
  eventName: string;
  primaryColor: string; // Renamed to camelCase (standard convention)
  secondaryColor?: string; // Optional field
  logoUrl?: string;
  organizerName?: string;
  // Add any other fields your API returns here
}

// 2. Define the State Shape
// This tells Redux exactly what the "microsite" part of the store looks like
interface MicrositeState {
  eventData: EventData | null; // Nullable because initially we have no data
  isLoading: boolean;
  error: string | null;
}

// 3. The Real Initial State
const initialState: MicrositeState = {
  eventData: null,
  isLoading: false,
  error: null,
};

const micrositeSlice = createSlice({
  name: "microsite",
  initialState,
  reducers: {
    // 4. Loading State (Call this before you start fetching)
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // 5. Success State (Strictly typed Payload)
    addEventData: (state, action: PayloadAction<EventData>) => {
      state.eventData = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // 6. Error State (If the fetch fails)
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { addEventData, setLoading, setError } = micrositeSlice.actions;
export default micrositeSlice.reducer;