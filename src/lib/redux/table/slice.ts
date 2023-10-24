import { createSlice } from "@reduxjs/toolkit";
import { fetchTable } from "./asyncActions";

import { type InitialTableSliceState } from "./types";
import { ResponseStatus } from "@/types";

const initialState: InitialTableSliceState = {
  results: [],
  count: 0,
  prev: null,
  next: null,
  status: ResponseStatus.LOADING,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTable(state, action) {
      state.results = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTable.pending, (state, action) => {
        state.status = ResponseStatus.LOADING;
        state.results = [];
      })
      .addCase(fetchTable.fulfilled, (state, action) => {
        state.status = ResponseStatus.SUCCESS;
        state.results = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.prev = action.payload.previous;
      })
      .addCase(fetchTable.rejected, (state, action) => {
        state.status = ResponseStatus.FAILURE;
        state.results = [];
      });
  },
});

export const { setTable } = tableSlice.actions;

export default tableSlice.reducer;
