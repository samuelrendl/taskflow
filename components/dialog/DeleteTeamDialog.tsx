"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deleteTeam } from "@/lib/api";
import { useMe } from "@/hooks/useMe";
import { useDispatch } from "react-redux";
import { removeTeam } from "@/lib/store/organizationSlice";

const DeleteTeamDialog = ({ teamId }: { teamId: string }) => {
  const dispatch = useDispatch();
  const me = useMe();
  const isUserOwner = me.me?.role === "OWNER";

  const handleDelete = async () => {
    try {
      await deleteTeam(teamId);
      dispatch(removeTeam(teamId));
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} disabled={!isUserOwner}>
          Delete Team
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action will permanently delete this team and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"destructive"} onClick={() => handleDelete()}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTeamDialog;
