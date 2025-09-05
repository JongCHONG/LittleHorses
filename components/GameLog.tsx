"use client";

import { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useGameLog } from "../utils/contexts/GameLogContext";

interface GameLogProps {
  height?: number | string;
}

const GameLog = ({ height }: GameLogProps) => {
  const { gameLog, clearLog } = useGameLog();
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTo({
        top: logContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [gameLog]);

  return (
    <div className="w-full lg:w-100 bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md flex flex-col h-full max-h-[600px]">
      <h2 className="text-lg font-bold mb-3 text-center sm:text-left">
        Game Log
      </h2>

      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto p-3 rounded border bg-white scrollbar-thin"
        style={{
          minHeight: height ? `${height}px` : "200px",
          maxHeight: height ? `${height}px` : "500px",
        }}
      >
        {gameLog?.length === 0 ? (
          <p className="text-gray-500 italic text-center">No actions yet...</p>
        ) : (
          gameLog?.map((log) => (
            <div
              key={uuidv4()}
              className={`mb-2 p-2 rounded text-xs sm:text-sm ${
                log.includes("WINS")
                  ? "bg-green-100 text-green-800 font-bold"
                  : log.includes("rolled")
                  ? "bg-blue-100 text-blue-800"
                  : log.includes("turn")
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {log}
            </div>
          ))
        )}
      </div>

      <button
        className="mt-3 w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
        onClick={() => clearLog()}
      >
        Clear Log
      </button>
    </div>
  );
};

export default GameLog;
