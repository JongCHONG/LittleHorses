import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import playersReducer from "./slices/playersSlice";
import currentReducer from "./slices/currentSlice";
import numOfPawnsReducer from "./slices/numOfPawnsSlice";
import playersOrderReducer from "./slices/playersOrderSlice";

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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["players", "current", "numOfPawnsPerTeam", "playersOrder"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "RESET_GAME",
        ],
        ignoredPaths: ["register"],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
