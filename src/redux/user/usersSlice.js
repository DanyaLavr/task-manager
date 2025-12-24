import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { register, login } from "../auth/operations";

const usersAdapter = createEntityAdapter({
  selectId: user => user.uid,
});
const initialState = usersAdapter.getInitialState();

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const user = action.payload.user;

        const existingUser = state.entities[user.uid];
        if (!existingUser) {
          usersAdapter.addOne(state, user);
        } else {
          usersAdapter.upsertOne(state, user);
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.user;
        const existingUser = state.entities[user.uid];
        if (!existingUser) {
          usersAdapter.addOne(state, user);
        } else {
          usersAdapter.upsertOne(state, user);
        }
      });
  },
});
export const userReducer = userSlice.reducer;
export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(
  state => state.user
);
