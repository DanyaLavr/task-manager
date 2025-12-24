import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchAll } from "../tasks/operations";
import { addComment, deleteComment } from "./operations";

const commentAdapter = createEntityAdapter();

const initialState = commentAdapter.getInitialState({
  isLoading: false,
  error: null,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        commentAdapter.setAll(state, action.payload.comments);
      })
      .addCase(fetchAll.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        commentAdapter.upsertMany(state, action.payload?.comments ?? []);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        commentAdapter.removeOne(state, action.payload?.comment);
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const {
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
} = commentAdapter.getSelectors(state => state.comments);
