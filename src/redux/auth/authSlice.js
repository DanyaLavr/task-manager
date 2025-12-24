import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
  //   createEntityAdapter,
} from "@reduxjs/toolkit";
import { register, login, logOut } from "./operations";

const initialState = {
  user: { name: "", email: "" },
  token: "",
  isLoggedIn: false,
  errorLoggedIn: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: builder => {
    builder

      .addCase(logOut.fulfilled, state => {
        state.user = { name: "", email: "" };
        state.token = "";
        state.isLoggedIn = false;
      })

      .addMatcher(isFulfilled(register, login, logOut), state => {
        state.isLoading = false;
      })

      .addMatcher(isFulfilled(register, login), (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addMatcher(isPending(register, login, logOut), state => {
        state.isLoading = true;
        state.error = null;
      })

      .addMatcher(isRejected(register, login, logOut), (state, action) => {
        state.isLoading = false;
        state.errorLoggedIn = action.payload;
      });
  },
});
export const authReducer = authSlice.reducer;
