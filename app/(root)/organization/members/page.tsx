"use client";

import React, { useEffect, useState } from "react";
import { fetchOrganization } from "@/lib/api";
import { useMe } from "@/hooks/useMe";
import { Organization, User } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import InviteMemberDialog from "@/components/dialog/InviteMemberDialog";

const Members = () => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const { me } = useMe();

  useEffect(() => {
    const loadOrganization = async () => {
      if (!me?.organization?.id) return;

      try {
        const org = await fetchOrganization(me.organization.id);
        setOrganization(org);
      } catch (error) {
        console.error("Failed to fetch organization:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [me?.organization?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading members...</div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">
          No organization found or you&#39;re not part of an organization.
        </div>
      </div>
    );
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "OWNER":
        return "bg-purple-100 text-purple-800";
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "MANAGER":
        return "bg-blue-100 text-blue-800";
      case "DEVELOPER":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUserInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Organization Members
        </h1>
        <p className="mt-1 text-gray-600">
          {organization.users.length} member
          {organization.users.length !== 1 ? "s" : ""} in {organization.name}
        </p>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="flex justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Members</h2>
          <InviteMemberDialog 
            type="organization" 
            organizationId={organization.id}
            existingMemberIds={organization.users.map(user => user.id)}
          />
        </div>

        <div className="divide-y divide-gray-200">
          {organization.users.map((member: User) => (
            <div
              key={member.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={member.image || undefined}
                    alt={member.name || member.email}
                  />
                  <AvatarFallback>
                    {getUserInitials(member.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {member.name || "No name"}
                    </p>
                    {member.id === organization.owner.id && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Owner
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-gray-500">
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleBadgeColor(member.role)}`}
                >
                  {member.role}
                </span>
                <div className="text-xs text-gray-400">
                  Joined {new Date(member.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {organization.users.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No members found in this organization.
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
