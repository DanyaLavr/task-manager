import { addComment, deleteComment, fetchAll } from "./opertions";

const { createSlice, createEntityAdapter } = require("@reduxjs/toolkit");
const commentAdapter = createEntityAdapter();
const initialState = commentAdapter.getInitialState({
  isLoading: false,
  error: null,
});
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.isLoading = false;
        commentAdapter.setAll(state, action.payload?.comments ?? []);
      })
      .addCase(fetchAll.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        // state.isLoading = false;
        commentAdapter.upsertMany(state, action.payload?.comments ?? []);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        commentAdapter.removeOne(state, action.payload?.comment);
      });
    // .addCase(addComment.pending, state => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(addComment.rejected, (state, action) => {
    //   state.error = action.payload;
    // });
  },
});
export const commentsReducer = commentsSlice.reducer;
export const {
  selectAll: selectAllComments,
  selectEntities: selectCommentsEntities,
} = commentAdapter.getSelectors(state => state.comments);
