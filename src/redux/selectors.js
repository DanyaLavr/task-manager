import { createSelector } from "@reduxjs/toolkit";
import { statusFilter } from "./constants";
import { selectAllTasks } from "./taskSlice";
import { selectAllComments, selectCommentsEntities } from "./commentsSlice";

export const selectTasksLoading = state => state.tasks.isLoading;
export const selectTasksError = state => state.tasks.error;

export const selectStatus = state => state.filter.status;

export const selectVisibleTasks = createSelector(
  [selectAllTasks, selectStatus],
  (tasks, filter) => {
    switch (filter) {
      case statusFilter.all:
        return tasks;
      case statusFilter.active:
        return tasks.filter(task => !task.completed);
      case statusFilter.completed:
        return tasks.filter(task => task.completed);
      default:
        throw new Error(`Unknown filter: ${statusFilter}`);
    }
  }
);
export const selectTaskCounter = createSelector([selectAllTasks], tasks =>
  tasks.reduce(
    (acc, elem) => {
      if (elem.completed) acc.completed++;
      else acc.active++;
      return acc;
    },
    { completed: 0, active: 0 }
  )
);

export const makeSelectCommentsForTask = commentsIds =>
  createSelector([selectCommentsEntities, (_, id) => id], (entities, id) => {
    console.log(entities, id);
    console.log(Object.values(entities));
    return commentsIds?.map(commentId => entities[commentId]);
  });
