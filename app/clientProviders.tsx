"use client";

import { Provider } from "react-redux";
import { store } from "../utils/store";
import { GameLogProvider } from "../utils/contexts/GameLogContext";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <GameLogProvider>
        {children}
      </GameLogProvider>
    </Provider>
  );
}