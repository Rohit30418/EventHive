import { configureStore } from "@reduxjs/toolkit";
// 1. Rename the import to 'micrositeReducer' (it's not the slice, it's the reducer)
import micrositeReducer from "../slice/micrositeSlice"; 

export const store = configureStore({
  reducer: {
    microsite: micrositeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;