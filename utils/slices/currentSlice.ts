import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CurrentPlayerState {
  currentPlayerIndex: number;
  currentPawnIndexByPlayer: number;
}

const initialState: CurrentPlayerState = {
  currentPlayerIndex: 0,
  currentPawnIndexByPlayer: 0,
};

const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {
    setCurrentPlayerIndex(state, action: PayloadAction<number>) {
      state.currentPlayerIndex = action.payload;
    },
    setCurrentPawnIndexByPlayer(
      state,
      action: PayloadAction<{ pawns: { isFinished?: boolean }[] }>
    ) {
      const { pawns } = action.payload;
      const index = pawns.findIndex((pawn) => !pawn.isFinished);
      state.currentPawnIndexByPlayer = index !== -1 ? index : 0;
    },
  },
});

export const { setCurrentPlayerIndex, setCurrentPawnIndexByPlayer } =
  currentSlice.actions;

export default currentSlice.reducer;
