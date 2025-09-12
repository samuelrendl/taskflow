"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { fetchAvailableUsers, fetchOrganization } from "@/lib/api";
import AvailableUser from "../AvailableUser";
import { User } from "@/lib/types";
import { useState } from "react";

interface InviteMemberProps {
  type: "organization" | "team";
  organizationId?: string;
  teamId?: string;
  existingMemberIds?: string[];
}

const InviteMemberDialog = ({
  type,
  organizationId,
  teamId,
  existingMemberIds = [],
}: InviteMemberProps) => {
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadAvailableUsers = async () => {
    if (!organizationId) return;

    setLoading(true);
    try {
      let users: User[] = [];
      
      if (type === "organization") {
        users = await fetchAvailableUsers();
      } else if (type === "team") {
        const organization = await fetchOrganization(organizationId);
        users = organization.users;
      }

      const filteredUsers = users.filter(
        (user) => !existingMemberIds.includes(user.id),
      );
      setAvailableUsers(filteredUsers);
    } catch (error) {
      console.error("Failed to fetch available users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      loadAvailableUsers();
    }
  };

  const handleUserInvited = (userId: string) => {
    setAvailableUsers((users) => users.filter((user) => user.id !== userId));
  };

  const getDialogContent = () => {
    if (type === "organization") {
      return {
        buttonText: "Invite to Organization",
        title: "Invite Users to Organization",
        description: "Select users to invite to your organization"
      };
    } else {
      return {
        buttonText: "Invite to Team",
        title: "Invite Users to Team",
        description: "Select organization members to invite to this team"
      };
    }
  };

  const dialogContent = getDialogContent();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>{dialogContent.buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogContent.title}</DialogTitle>
          <DialogDescription>
            {dialogContent.description}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-96 space-y-2 overflow-y-auto">
          {loading ? (
            <div className="py-4 text-center text-gray-500">
              Loading users...
            </div>
          ) : availableUsers.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              No available users to invite
            </div>
          ) : (
            availableUsers.map((user) => (
              <AvailableUser
                key={user.id}
                {...user}
                organizationId={organizationId}
                teamId={teamId}
                inviteType={type}
                onInvited={() => handleUserInvited(user.id)}
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
