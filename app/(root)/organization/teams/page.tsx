"use client";
import DeleteTeamDialog from "@/components/dialog/DeleteTeamDialog";
import InviteMemberDialog from "@/components/dialog/InviteMemberDialog";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";

const Teams = () => {
  const { organization, loading } = useSelector((state: RootState) => ({
    organization: state.organization.organization,
    loading: state.organization.loading,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading teams...</div>
      </div>
    );
  }
  return (
    <div>
      {organization?.teams.map((team) => (
        <div key={team.id} className="border-b p-4">
          <h3 className="text-lg font-medium">{team.name}</h3>
          <InviteMemberDialog
            type="team"
            organizationId={organization.id}
            teamId={team.id}
            existingMemberIds={team.users?.map((user) => user.id) || []}
          />
          <DeleteTeamDialog teamId={team.id} />
        </div>
      ))}
    </div>
  );
};

export default Teams;
