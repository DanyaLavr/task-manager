import { createSelector } from "@reduxjs/toolkit";
import { selectCommentEntities } from "./commentsSlice";

export const makeSelectCommentsForTask = (commentIds) =>
  createSelector([selectCommentEntities], (entities) => {
    return commentIds.map((commentId) => entities[commentId]);
  });
