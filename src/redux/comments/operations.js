import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { normalize } from "normalizr";
import { taskEntity } from "redux/tasks/schemas";

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

      const updatedTask = await axios.put(`tasks/${taskId}`, {
        comments: res.data.comments.filter(elem => elem.id !== commentId),
      });
      const normalized = normalize(updatedTask.data, taskEntity);

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
