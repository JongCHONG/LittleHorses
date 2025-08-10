import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Player } from "../intefaces/player";

const initialState: Player = {
  color: "none",
  name: "",
  score: 0,
  pawns: [],
  canPlay: false,
  actualPosition: { x: 0, y: 0 },
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setColor: (
      state,
      action: PayloadAction<
        | "none"
        | "tan"
        | "burntSienna"
        | "cambridgeBlue"
        | "prussianBlue"
        | undefined
      >
    ) => {
      state.color = action.payload;
    },
    setActualPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.actualPosition = action.payload;
    },
  },
});

export const { setName, setColor, setActualPosition } = playerSlice.actions;
export default playerSlice.reducer;
