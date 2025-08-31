import { combineReducers, configureStore } from "@reduxjs/toolkit";

import playersReducer from "./slices/playersSlice";
import currentReducer from "./slices/currentSlice";
import numOfPawnsReducer from "./slices/numOfPawnsSlice";
import playersOrderReducer from "./slices/playersOrderSlice";
import type { Reducer } from "@reduxjs/toolkit";

const appReducer = combineReducers({
  players: playersReducer,
  current: currentReducer,
  numOfPawnsPerTeam: numOfPawnsReducer,
  playersOrder: playersOrderReducer,
});

export type RootState = ReturnType<typeof appReducer>;
type RootAction = Parameters<typeof appReducer>[1];

const rootReducer: Reducer<RootState, RootAction> = (state, action) => {
  if (action.type === "RESET_GAME") {
    return appReducer(undefined, { type: "" } as RootAction);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
