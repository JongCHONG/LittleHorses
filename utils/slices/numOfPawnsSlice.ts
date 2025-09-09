import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: number = 0;

const numOfPawnsSlice = createSlice({
  name: 'numOfPawnsPerTeam',
  initialState,
  reducers: {
    setNumOfPawns(_state, action: PayloadAction<number>) {
      return action.payload;
    },
  },
});

export const { setNumOfPawns } = numOfPawnsSlice.actions;
export default numOfPawnsSlice.reducer;