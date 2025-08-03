import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Me } from "../types";

interface MeState {
  me: Me | null;
}

const initialState: MeState = {
  me: null,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<Me>) => {
      state.me = action.payload;
    },
    clearMe: (state) => {
      state.me = null;
    },
  },
});

export const { setMe, clearMe } = meSlice.actions;
export default meSlice.reducer;
