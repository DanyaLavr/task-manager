import { createSelector } from "@reduxjs/toolkit";
import { selectAllTasks } from "../tasks/tasksSlice";
import { selectIsAdmin, selectUser } from "redux/auth/selectors";

export const statusFilter = Object.freeze({
  all: "all",
  active: "active",
  completed: "completed",
});

export const selectFilter = state => state.filters.status;

export const selectVisibleTasks = createSelector(
  [selectAllTasks, selectFilter, selectUser, selectIsAdmin],
  (tasks, filter, { uid }, isAdmin) => {
    let filteredTasks = tasks;
    if (!isAdmin && uid) {
      filteredTasks = tasks.filter(elem => elem.userId === uid);
    }
    switch (filter) {
      case statusFilter.all:
        return filteredTasks;
      case statusFilter.active:
        return filteredTasks.filter(task => !task.completed);
      case statusFilter.completed:
        return filteredTasks.filter(task => task.completed);
      default:
        return filteredTasks;
    }
  }
);

export const selectTaskCount = createSelector(
  [selectAllTasks, selectUser, selectIsAdmin],
  (tasks, { uid }, isAdmin) => {
    let filteredTasks = tasks;
    if (!isAdmin && uid) {
      filteredTasks = tasks.filter(elem => elem.userId === uid);
    }
    return filteredTasks.reduce(
      (count, task) => {
        if (task.completed) {
          count.completed += 1;
        } else {
          count.active += 1;
        }
        return count;
      },
      { active: 0, completed: 0 }
    );
  }
);
