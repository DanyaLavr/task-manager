import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalize } from "normalizr";
import { taskEntity } from "./schemas";
import axios from "axios";

axios.defaults.baseURL = "https://6920b965512fb4140bde44b9.mockapi.io";

const normaliseTaskResponse = data => {
  const normalise = normalize(data, taskEntity);

  const taskMap = normalise.entities.tasks || {};
  const taskId = normalise.result;

  return {
    task: taskId ? taskMap[taskId] : null,
  };
};

export const fetchAll = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/tasks");
      console.log(response);
      const normalise = normalize(response.data, [taskEntity]);

      const tasksMap = normalise.entities.tasks || [];
      const commentsMap = normalise.entities.comments || [];
      const tasksArray = normalise.result.map(id => tasksMap[id]);

      return {
        tasks: tasksArray,
        comments: commentsMap,
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ text, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/tasks", { text, userId });
      return normaliseTaskResponse(response.data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return normaliseTaskResponse(response.data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "task/toggleCompleted",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      return normaliseTaskResponse(response.data);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
