import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Me, Organization } from "../types";

interface MeState {
  me: Me | null;
  loading: boolean;
}

const initialState: MeState = {
  me: null,
  loading: true,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {
    setMe: (state, action: PayloadAction<Me>) => {
      state.me = action.payload;
      state.loading = false;
    },
    clearMe: (state) => {
      state.me = null;
      state.loading = false;
    },
    updateOrganization: (state, action: PayloadAction<Organization>) => {
      if (state.me) {
        state.me.organization = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setMe, clearMe, updateOrganization, setLoading } = meSlice.actions;
export default meSlice.reducer;
