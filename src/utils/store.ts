import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playersSlice'
import currentReducer from './slices/currentSlice';
import numOfPawnsReducer from './slices/numOfPawnsSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    current: currentReducer,
    numOfPawns: numOfPawnsReducer,
  },
  devTools: true
});