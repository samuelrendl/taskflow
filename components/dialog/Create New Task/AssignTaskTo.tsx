"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useMe } from "@/hooks/useMe";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignTaskToProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

const AssignTaskTo = ({ value, onChange }: AssignTaskToProps) => {
  const [open, setOpen] = React.useState(false);

  const currentUser = useMe();
  const organization = useSelector(
    (state: RootState) => state.organization.organization,
  );

  const availableUsers = React.useMemo(() => {
    if (!organization || !currentUser.me) return [];

    const isOwnerOrManager =
      currentUser.me.role === "OWNER" || currentUser.me.role === "MANAGER";

    if (isOwnerOrManager) {
      return organization.users;
    } else {
      const userTeam = organization.teams.find((team) =>
        team.users?.some((member) => member.id === currentUser.me?.id),
      );
      return userTeam?.users || [];
    }
  }, [organization, currentUser]);

  const selectedUser = availableUsers.find((user) => user.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value === undefined
            ? "Unassigned"
            : selectedUser
              ? selectedUser.name
              : "Select user"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="unassigned"
                onSelect={() => {
                  onChange(undefined);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === undefined ? "opacity-100" : "opacity-0",
                  )}
                />
                Unassigned
              </CommandItem>
              {availableUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? undefined : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AssignTaskTo;
