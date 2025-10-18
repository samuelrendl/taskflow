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
import { deleteTask } from "@/lib/api";
import { useDispatch } from "react-redux";
import { removeTask } from "@/lib/store/tasksSlice";
import { toast } from "sonner";
import { Trash } from "lucide-react";

const DeleteTaskDialog = ({ taskId }: { taskId: string }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      dispatch(removeTask(taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Trash color="#ffffff" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
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

export default DeleteTaskDialog;
