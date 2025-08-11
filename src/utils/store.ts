import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playerSlice'
import currentPlayerReducer from './slices/currentPlayerSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    currentPlayer: currentPlayerReducer,
  },
  devTools: true
});