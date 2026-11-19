import { configureStore } from "@reduxjs/toolkit";
// 1. Rename the import to 'micrositeReducer' (it's not the slice, it's the reducer)
import micrositeReducer from "../slice/micrositeSlice";
import eventBuilderReducer from "../slice/eventBuilderSlice"; 

export const store = configureStore({
  reducer: {
    microsite: micrositeReducer,
    eventBuilder: eventBuilderReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;