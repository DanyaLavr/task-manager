import {
  createEntityAdapter,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import {
  fetchAll,
  addTask,
  deleteTask,
  toggleCompleted,
  addComment,
  deleteComment,
} from "./opertions";
const tasksAdapter = createEntityAdapter();
const initialState = tasksAdapter.getInitialState({
  isLoading: false,
  error: null,
});
const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  extraReducers: builder => {
    builder

      //* Fullfiled
      .addCase(fetchAll.fulfilled, (state, action) => {
        // state.items = action.payload;
        tasksAdapter.setAll(state, action.payload.tasks);
      })

      .addCase(addTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload.task);
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        console.log(action.payload);
        tasksAdapter.removeOne(state, action.payload.task.id);
      })

      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        tasksAdapter.upsertOne(state, action.payload.task);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log(action.payload);
        tasksAdapter.upsertOne(state, action.payload.task);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        tasksAdapter.upsertOne(state, action.payload.task);
      })
      .addMatcher(
        isPending(fetchAll, addTask, deleteTask, toggleCompleted),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isFulfilled(fetchAll, addTask, deleteTask, toggleCompleted),
        state => {
          state.isLoading = false;
        }
      )

      .addMatcher(
        isRejected(fetchAll, addTask, deleteTask, toggleCompleted),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const taskReducer = tasksSlice.reducer;
export const { selectAll: selectAllTasks } = tasksAdapter.getSelectors(
  state => state.tasks
);
