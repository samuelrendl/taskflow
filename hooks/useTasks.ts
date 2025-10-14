import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setLoading,
} from "@/lib/store/tasksSlice";
import { fetchTasksByTeam, createTask } from "@/lib/api";

export const useTasks = (teamId?: string) => {
  const dispatch = useDispatch();
  const { tasks = [], loading = false } = useSelector(
    (state: RootState) => state.tasks || { tasks: [], loading: false }
  );

  const fetchTasks = useCallback(async () => {
    if (!teamId) {
      dispatch(setTasks([]));
      return;
    }
    try {
      dispatch(setLoading(true));
      const fetchedTasks = await fetchTasksByTeam(teamId);
      dispatch(setTasks(fetchedTasks));
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      dispatch(setLoading(false));
    }
  }, [dispatch, teamId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createNewTask = useCallback(
    async (
      title: string,
      description: string,
      status: string,
      priority: string,
      assignTo?: string,
      taskTeamId?: string,
    ) => {
      try {
        const newTask = await createTask(
          title,
          description,
          status,
          priority,
          assignTo,
          taskTeamId || teamId,
        );

        dispatch(addTask(newTask));
        return newTask;
      } catch (error) {
        console.error("Failed to create task:", error);
        throw error;
      }
    },
    [teamId, dispatch],
  );

  const getTasksByStatus = useCallback(
    (status: string) => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks],
  );

  const getTasksByPriority = useCallback(
    (priority: string) => {
      return tasks.filter((task) => task.priority === priority);
    },
    [tasks],
  );

  const getTasksByAssignee = useCallback(
    (userId: string) => {
      return tasks.filter((task) => task.assignedTo?.id === userId);
    },
    [tasks],
  );

  return {
    tasks,
    loading,
    fetchTasks,
    createTask: createNewTask,
    getTasksByStatus,
    getTasksByPriority,
    getTasksByAssignee,
  };
};
