"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectedTeam } from "@/hooks/useSelectedTeam";
import { useTasks } from "@/hooks/useTasks";

const headItems = ["Title", "Description", "Status", "Priority", "Assigned To"];

const TaskTable = () => {
  const teamId = useSelectedTeam()?.id;
  const { tasks, loading } = useTasks(teamId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  if (!teamId) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Please select a team to view tasks</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">
          No tasks yet. Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your recent tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          {headItems.map((item) => (
            <TableHead key={item}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell className="max-w-md truncate">{task.description}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.assignedTo?.name || "Unassigned"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
