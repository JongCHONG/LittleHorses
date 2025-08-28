import { useRef, useEffect } from "react";
import { useGameLog } from "../utils/contexts/GameLogContext";

interface GameLogProps {
  height: number | string;
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
    <div className="w-80 bg-gray-100 p-4 mt-2 rounded shadow-md">
      <div
        ref={logContainerRef}
        className={`overflow-y-auto p-3 rounded border`}
        style={{ height: `${height}px` }}
      >
        {gameLog?.length === 0 ? (
          <p className="text-gray-500 italic">No actions yet...</p>
        ) : (
          gameLog?.map((log, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded text-sm ${
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
        className="mt-3 w-full bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600"
        onClick={() => clearLog()}
      >
        Clear Log
      </button>
    </div>
  );
};

export default GameLog;
