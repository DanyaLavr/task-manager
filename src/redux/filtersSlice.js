const { createSlice } = require("@reduxjs/toolkit");
const { statusFilter } = require("./constants");

const filtersSlice = createSlice({
  name: "filters",
  initialState: { status: statusFilter.all },
  reducers: {
    setStatusFilter: {
      reducer(state, action) {
        state.status = action.payload;
      },
    },
  },
});
export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
