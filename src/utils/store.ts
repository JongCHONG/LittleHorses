import { combineReducers, configureStore } from "@reduxjs/toolkit";

import playersReducer from "./slices/playersSlice";
import currentReducer from "./slices/currentSlice";
import numOfPawnsReducer from "./slices/numOfPawnsSlice";

const appReducer = combineReducers({
  players: playersReducer,
  current: currentReducer,
  numOfPawnsPerTeam: numOfPawnsReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_GAME") {
    return appReducer(undefined, { type: "" });
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
