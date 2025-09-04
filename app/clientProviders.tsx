"use client";

import { Provider } from "react-redux";
import { store, persistor } from "../utils/store";
import { GameLogProvider } from "../utils/contexts/GameLogContext";
import { PersistGate } from "redux-persist/integration/react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GameLogProvider>{children}</GameLogProvider>
      </PersistGate>
    </Provider>
  );
}
