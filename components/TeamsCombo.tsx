"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { selectTeam } from "@/lib/store/organizationSlice";
import { useSelectedTeam } from "@/hooks/useSelectedTeam";

import { cn } from "@/lib/utils";
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
import TeamDialog from "./dialog/Create New Team/TeamDialog";

const TeamsCombo = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const teams = useSelector(
    (state: RootState) => state.organization.organization?.teams || [],
  );
  const selectedTeam = useSelectedTeam();
  const selectedTeamId = selectedTeam?.id;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedTeam ? selectedTeam.name : "Select team..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search team..." />
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.id}
                  value={team.name}
                  onSelect={() => {
                    dispatch(selectTeam(team.id));
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTeamId === team.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {team.name}
                </CommandItem>
              ))}
              <CommandItem className="p-0">
                <TeamDialog />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TeamsCombo;
