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
    updatePlayer: (state, action: PayloadAction<Player>) => {
      const index = state.findIndex(
        (player) => player.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    setPawnActualPosition: (
      state,
      action: PayloadAction<{
        index: number;
        position: { x: number; y: number; id: number };
      }>
    ) => {
      const { index, position } = action.payload;
      if (state[index] && state[index].pawns && state[index].pawns[0]) {
        state[index].pawns[0].position = {
          x: position.x,
          y: position.y,
          id: position.id,
        };
      }
    },
  },
});

export const { addPlayer, updatePlayer, setPawnActualPosition } =
  playerSlice.actions;
export default playerSlice.reducer;
