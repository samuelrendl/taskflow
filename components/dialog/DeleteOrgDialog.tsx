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
import { deleteOrganization } from "@/lib/api";
import { redirect } from "next/navigation";
import { useMe } from "@/hooks/useMe";

const DeleteOrgDialog = () => {
  const me = useMe();
  const isUserOwner = me.me?.role === "OWNER";

  const handleDelete = () => {
    try {
      deleteOrganization(me.me!.organization!.id);
    } catch (error) {
      console.error("Failed to delete organization:", error);
    } finally {
      redirect("/");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} disabled={!isUserOwner}>
          Delete Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            organization and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"destructive"} onClick={() => handleDelete()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteOrgDialog;
