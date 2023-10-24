import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type InitialFilterSliceState } from "./types";

const initialState: InitialFilterSliceState = {
  offset: 10,
  limit: 10,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    // setFilters(state, action: PayloadAction<InitialFilterSliceState>) {
    //   if (Object.keys(action.payload).length) {
    //     state.offset = action.payload.offset;
    //   } else {
    //     state.offset = 10;
    //   }
    // },
  },
});

export const { setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
