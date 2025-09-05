import { useRouter } from "next/navigation";

import { colorMap } from "utils/constants/colorMap";
import { Player } from "utils/intefaces/player";

import GameLog from "./GameLog";
import Button from "./Button";


interface GameControlsProps {
  currentPlayer: Player;
  playersOrder: number[];
  onDiceRoll: () => void;
  onRestart: () => void;
  players: Player[];
  diceRoll: number;
  currentPlayerIndex: number;
}

const GameControls = ({
  currentPlayer,
  playersOrder,
  onDiceRoll,
  onRestart,
  players,
  diceRoll,
  currentPlayerIndex,
}: GameControlsProps) => {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col flex-start">
      <div
        className="rounded-lg shadow-md p-4 sm:p-6 mb-4"
        style={{
          backgroundColor: colorMap[currentPlayer?.color ?? "none"] || "white",
          transition: "background-color 0.3s ease",
        }}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Game Controls</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Players Order:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
            {playersOrder.map((playerIdx: number) => (
              <div
                key={playerIdx}
                className={`px-2 py-1 rounded text-sm ${
                  playerIdx === currentPlayerIndex
                    ? "bg-indigo-100 font-bold text-indigo-700"
                    : "text-gray-600"
                }`}
              >
                {players[playerIdx]?.name || `Joueur ${playerIdx + 1}`}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
          <Button onClick={onDiceRoll}>Roll Dice: {diceRoll}</Button>
          <Button color="red" onClick={onRestart}>
            Restart
          </Button>
          <Button onClick={() => router.push("/rules")}>Rules</Button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <GameLog height={400} />
      </div>
    </div>
  );
};

export default GameControls;
