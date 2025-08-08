import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Me, Organization } from "../types";

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
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      if (state.me) {
        state.me.organization = action.payload;
      }
    },
  },
});

export const { setMe, clearMe, updateOrganization } = meSlice.actions;
export default meSlice.reducer;
