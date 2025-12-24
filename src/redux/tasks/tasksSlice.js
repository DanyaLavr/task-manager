import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchAll, addTask, deleteTask, toggleCompleted } from "./operations";
import { addComment, deleteComment } from "redux/comments/operations";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  isLoading: false,
  error: null,
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,

  extraReducers: builder => {
    builder

      .addCase(fetchAll.fulfilled, (state, action) => {
        tasksAdapter.setAll(state, action.payload.tasks);
      })

      .addCase(addTask.fulfilled, (state, action) => {
        tasksAdapter.addOne(state, action.payload.task);
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        tasksAdapter.removeOne(state, action.payload.task.id);
      })

      .addCase(toggleCompleted.fulfilled, (state, action) => {
        tasksAdapter.upsertOne(state, action.payload.task);
      })

      .addCase(addComment.fulfilled, (state, action) => {
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
        isRejected(fetchAll, addTask, deleteTask, toggleCompleted),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      .addMatcher(
        isFulfilled(fetchAll, addTask, deleteTask, toggleCompleted),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const taskReducer = tasksSlice.reducer;
export const { selectAll: selectAllTasks } = tasksAdapter.getSelectors(
  state => state.tasks
);
