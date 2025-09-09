'use client'

import React, { createContext, useContext, useState } from "react";

interface GameLogContextType {
  gameLog: string[];
  addLog: (msg: string) => void;
  clearLog: () => void;
}

const GameLogContext = createContext<GameLogContextType | undefined>(undefined);

export const useGameLog = () => {
  const ctx = useContext(GameLogContext);
  if (!ctx) throw new Error("useGameLog must be used within GameLogProvider");
  return ctx;
};

export const GameLogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameLog, setGameLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setGameLog((prev) => [...prev, `[${timestamp}] ${msg}`]);
  };

  const clearLog = () => setGameLog([]);

  return (
    <GameLogContext.Provider value={{ gameLog, addLog, clearLog }}>
      {children}
    </GameLogContext.Provider>
  );
};
