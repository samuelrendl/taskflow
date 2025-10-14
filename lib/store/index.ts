import { configureStore } from "@reduxjs/toolkit";
import meReducer from "./meSlice";
import organizationReducer from "./organizationSlice";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    me: meReducer,
    organization: organizationReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
