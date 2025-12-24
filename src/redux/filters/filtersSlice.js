import { createSlice } from "@reduxjs/toolkit";
import { statusFilter } from "./selectors";

const filtersInitialState = {
  status: statusFilter.all,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
  },
});
export const { setStatusFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
