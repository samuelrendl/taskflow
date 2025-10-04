"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AssignTaskTo from "./AssignTaskTo";
import PrioritySelect from "./PrioritySelect";
import StatusSelect from "./StatusSelect";
import { createTask } from "@/lib/api";
import { useSelectedTeam } from "@/hooks/useSelectedTeam";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED", "UNASSIGNED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  assignedToId: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

const defaultValues: TaskFormData = {
  title: "",
  description: "",
  status: "OPEN",
  priority: "MEDIUM",
  assignedToId: undefined,
};

const CreateNewTaskDialog = () => {
  const [open, setOpen] = useState(false);

  const team = useSelectedTeam();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const onSubmit = async (data: TaskFormData) => {
    console.log(data);
    await createTask(
      data.title,
      data.description,
      data.status,
      data.priority,
      data.assignedToId,
      team?.id,
    );
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open, form]);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!team}>Create new task</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <PrioritySelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <StatusSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign To</FormLabel>
                  <FormControl>
                    <AssignTaskTo
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Task
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewTaskDialog;
