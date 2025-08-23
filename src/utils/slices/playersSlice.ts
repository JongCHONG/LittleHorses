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
      // const index = state.findIndex(
      //   (player) => player.id === action.payload.id
      // );
      // if (index !== -1) {
      state[action.payload.id] = {
        ...state[action.payload.id],
        ...action.payload,
      };
      // }
    },
    setPawnActualPosition: (
      state,
      action: PayloadAction<{
        playerIndex: number;
        pawnIndex: number;
        position: { x: number; y: number; id: number };
        isFinished?: boolean;
      }>
    ) => {
      const { playerIndex, position, isFinished, pawnIndex } = action.payload;
      if (
        state[playerIndex] &&
        state[playerIndex].pawns &&
        state[playerIndex].pawns[pawnIndex]
      ) {
        state[playerIndex].pawns[pawnIndex].lastPosition = {
          x: state[playerIndex].pawns[pawnIndex].actualPosition?.x ?? 0,
          y: state[playerIndex].pawns[pawnIndex].actualPosition?.y ?? 0,
          id: state[playerIndex].pawns[pawnIndex].actualPosition?.id ?? 0,
        };
        state[playerIndex].pawns[pawnIndex].actualPosition = {
          x: position.x,
          y: position.y,
          id: position.id,
        };
        if (isFinished) {
          state[playerIndex].pawns[pawnIndex].isFinished = isFinished;
        }
      }
    },
  },
});

export const { addPlayer, updatePlayer, setPawnActualPosition } =
  playerSlice.actions;
export default playerSlice.reducer;
