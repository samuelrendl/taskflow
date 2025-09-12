import { User } from "@/lib/types";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { inviteUserToOrganization } from "@/lib/api";
import { toast } from "sonner";

interface AvailableUserProps extends User {
  organizationId?: string;
  inviteType?: "organization" | "team";
  teamId?: string;
  onInvited?: () => void;
}

const AvailableUser = ({
  organizationId,
  inviteType = "organization",
  teamId,
  onInvited,
  ...user
}: AvailableUserProps) => {
  const [inviting, setInviting] = useState(false);

  const handleInvite = async () => {
    if (!organizationId) return;

    setInviting(true);
    try {
      if (inviteType === "organization") {
        await inviteUserToOrganization(user.id, organizationId);
        toast.success(`Successfully invited user ${user.name} to organization`);
      } else if (inviteType === "team") {
        // TODO: Add actual team invite API call here
        // await inviteUserToTeam(user.id, teamId);
        console.log(`Inviting user ${user.id} to team ${teamId}`);
      }

      onInvited?.();
    } catch (error) {
      toast.error('"Failed to invite user. Please try again.');
      console.error(
        `Failed to invite user: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setInviting(false);
    }
  };

  const getUserInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-4 rounded-md border p-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.image || undefined} />
        <AvatarFallback className="text-sm">{getUserInitials()}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">
          {user.name || "No Name"}
        </p>
        <p className="truncate text-sm text-gray-500">{user.email}</p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleInvite}
        disabled={inviting}
      >
        {inviting ? "Inviting..." : "Invite"}
      </Button>
    </div>
  );
};

export default AvailableUser;
