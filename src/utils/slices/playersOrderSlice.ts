import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [];

const playersOrderSlice = createSlice({
  name: "playersOrder",
  initialState,
  reducers: {
    setPlayersOrder(_state, action: PayloadAction<number[]>) {
      return action.payload;
    },
  },
});

export const { setPlayersOrder } = playersOrderSlice.actions;

export default playersOrderSlice.reducer;
