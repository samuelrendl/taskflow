import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Organization, Team } from "../types";

interface OrganizationState {
  organization: Organization | null;
  selectedTeamId: string | null;
  loading: boolean;
}

const initialState: OrganizationState = {
  organization: null,
  selectedTeamId: null,
  loading: false,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<Organization>) => {
      state.organization = action.payload;
      state.loading = false;
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      if (state.organization) {
        state.organization.teams.push({
          id: action.payload.id,
          name: action.payload.name,
        });
      }
    },
    removeTeam: (state, action: PayloadAction<string>) => {
      if (state.organization) {
        state.organization.teams = state.organization.teams.filter(
          (team) => team.id !== action.payload
        );
      }
    },
    selectTeam: (state, action: PayloadAction<string>) => {
      state.selectedTeamId = action.payload;
    },
    clearOrganization: (state) => {
      state.organization = null;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setOrganization, addTeam, removeTeam, selectTeam, clearOrganization, setLoading } =
  organizationSlice.actions;
export default organizationSlice.reducer;
