import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Player } from "../intefaces/player";

const initialState: Player[] = [];

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.push(action.payload);
    },
    setPawnActualPosition: (
      state,
      action: PayloadAction<{
        index: number;
        position: { x: number; y: number };
      }>
    ) => {
      const { index, position } = action.payload;
      if (state[index]) state[index].pawns[index].position = position;
    },
  },
});

export const { addPlayer, setPawnActualPosition } = playerSlice.actions;
export default playerSlice.reducer;
