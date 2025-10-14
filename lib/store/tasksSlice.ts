import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../types";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  currentTeamId: string | null;
}

const initialState: TasksState = {
  tasks: [],
  currentTeamId: null,
  loading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      // Defensive check - ensure tasks array exists
      if (!state.tasks) {
        state.tasks = [];
      }
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      // Defensive check - ensure tasks array exists
      if (!state.tasks) {
        state.tasks = [];
        return;
      }
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      // Defensive check - ensure tasks array exists
      if (!state.tasks) {
        state.tasks = [];
        return;
      }
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask, setLoading } =
  tasksSlice.actions;
export default tasksSlice.reducer;
