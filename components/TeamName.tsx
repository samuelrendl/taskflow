"use client";

import { useSelectedTeam } from "@/hooks/useSelectedTeam";

const TeamName = () => {
  const team = useSelectedTeam();

  if (!team) return <div>No team selected</div>;
  return <div>{team.name}</div>;
};

export default TeamName;
