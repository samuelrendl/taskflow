import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useSelectedTeam = () => {
  return useSelector((state: RootState) => {
    const teams = state.organization.organization?.teams || [];
    const selectedTeamId = state.organization.selectedTeamId;

    if (!selectedTeamId) return null;

    return teams.find(team => team.id === selectedTeamId) || null;
  });
};