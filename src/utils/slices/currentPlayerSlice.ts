import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CurrentPlayerState {
  currentPlayerIndex: number;
}

const initialState: CurrentPlayerState = {
  currentPlayerIndex: 0,
};

const currentPlayerSlice = createSlice({
  name: "currentPlayer",
  initialState,
  reducers: {
    setCurrentPlayerIndex(state, action: PayloadAction<number>) {
      state.currentPlayerIndex = action.payload;
    },
    nextPlayer(state, action: PayloadAction<number>) {
      state.currentPlayerIndex =
        (state.currentPlayerIndex + 1) % action.payload;
    },
    resetPlayerIndex(state) {
      state.currentPlayerIndex = 0;
    },
  },
});

export const { setCurrentPlayerIndex, nextPlayer, resetPlayerIndex } =
  currentPlayerSlice.actions;

export default currentPlayerSlice.reducer;
