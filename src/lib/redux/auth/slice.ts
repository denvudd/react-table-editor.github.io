import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type InitialAuthSliceState } from "./types";

const initialState: InitialAuthSliceState = {
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
  },
});

export const { setIsLogged } = authSlice.actions;

export default authSlice.reducer;
