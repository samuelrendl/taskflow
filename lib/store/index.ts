import { configureStore } from "@reduxjs/toolkit";
import meReducer from "./meSlice";
import organizationSlice from "./organizationSlice";

export const store = configureStore({
  reducer: {
    me: meReducer,
    organization: organizationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
