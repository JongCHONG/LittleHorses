import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './slices/playerSlice'

export const store = configureStore({
  reducer: {
    players: playersReducer,
  },
  devTools: true
});