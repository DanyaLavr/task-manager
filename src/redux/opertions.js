import axios from "axios";
import { normalize } from "normalizr";
import { taskEntity } from "./schemas";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://6920b965512fb4140bde44b9.mockapi.io/";

const normaliseTaskResponse = data => {
  const normalise = normalize(data, taskEntity);
  const taskMap = normalise.entities.tasks ?? {};
  const taskId = normalise.result;
  return { task: taskId ? taskMap[taskId] : null };
};

export const fetchAll = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/tasks");
      const normalise = normalize(res.data, [taskEntity]);
      const tasksMap = normalise.entities.tasks ?? [];
      const commentsMap = normalise.entities.comments ?? [];
      const tasksArray = normalise.result.map(id => tasksMap[id]);
      const commentsArray = Object.values(commentsMap);

      return {
        tasks: tasksArray,
        comments: commentsArray,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (text, thunkAPI) => {
    try {
      const res = await axios.post("tasks", { text });
      return normaliseTaskResponse(res.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`/tasks/${id}`);
      return normaliseTaskResponse(res.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "tasks/toggleComplited",
  async (task, thunkAPI) => {
    try {
      const res = await axios.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      return normaliseTaskResponse(res.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ id, text }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/tasks/${id}`);
      const task = res.data;
      const newComment = {
        id: new Date().getTime().toString(),
        text,
      };
      const updatedComments = [...task.comments, newComment];

      const updatedTask = await axios.put(`/tasks/${id}`, {
        comments: updatedComments,
      });
      const normalized = normalize(updatedTask.data, taskEntity);
      return {
        task: normalized.entities.tasks ? normalized.entities.tasks[id] : null,
        comments: normalized.entities.comments ?? [],
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ taskId, commentId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`tasks/${taskId}`);
      console.log("res", res.data);
      const updatedTask = await axios.put(`tasks/${taskId}`, {
        comments: res.data.comments.filter(elem => elem.id !== commentId),
      });
      console.log("updatedTask", updatedTask);
      const normalized = normalize(updatedTask.data, taskEntity);
      console.log({
        task: normalized.entities.tasks
          ? normalized.entities.tasks[taskId]
          : null,
        comment: commentId,
      });
      return {
        task: normalized.entities.tasks
          ? normalized.entities.tasks[taskId]
          : null,
        comment: commentId,
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
