import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  listOfNotifications: [],
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: nanoid(),
        message: action.payload.message,
        type: action.payload.type,
      };
      state.listOfNotifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.listOfNotifications.splice(
        state.listOfNotifications.findIndex(elem => elem.id === action.payload),
        1
      );
    },
  },
});
export const notificationReducer = notificationSlice.reducer;

export const { addNotification, removeNotification } =
  notificationSlice.actions;
