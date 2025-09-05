'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { Player } from "../utils/intefaces/player";
import { setCurrentPlayerIndex } from "../utils/slices/currentSlice";
import { setPlayersOrder } from "../utils/slices/playersOrderSlice";
import { useGameLog } from "../utils/contexts/GameLogContext";
import Button from "./Button";

type PlayerWithRoll = Player & { roll: number | null };

interface PlayersOrderFormProps {
  handleReset: () => void;
}

const PlayersOrderForm = ({
  handleReset,
}: PlayersOrderFormProps) => {
  const dispatch = useDispatch();
  const { addLog } = useGameLog();
  const players = useSelector((state: { players: Player[] }) => state.players);
  const [tempPlayersOrder, setTempPlayersOrder] = useState<PlayerWithRoll[]>(
    players.map((p) => ({ ...p, roll: null }))
  );
  const [tempCurrentPlayerIndex, setTempCurrentPlayerIndex] = useState(0);
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  useEffect(() => {
    if (isOrderComplete && tempPlayersOrder.every(p => p.roll !== null)) {
      const sortedOrder = [...tempPlayersOrder].sort(
        (a, b) => (b.roll ?? 0) - (a.roll ?? 0)
      );
      
      dispatch(setPlayersOrder(sortedOrder.map((p) => p.id)));
      dispatch(setCurrentPlayerIndex(sortedOrder[0].id));
      
      const orderStr = sortedOrder
        .map((p) => `${p.name} (${p.roll})`)
        .join(" -> ");
      addLog(`Final Order : ${orderStr}`);
      
    }
  }, [isOrderComplete, tempPlayersOrder, dispatch, addLog]);

  const handleRollDice = () => {
    if (isRolling) return;
    if (tempCurrentPlayerIndex >= tempPlayersOrder.length) {
      setMessage("Tous les joueurs ont lancé le dé.");
      return;
    }
    
    setIsRolling(true);
    setMessage("");
    let count = 0;
    
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count > 10) {
        clearInterval(intervalId);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(finalRoll);
        
        addLog(
          `${tempPlayersOrder[tempCurrentPlayerIndex].name} rolled a ${finalRoll}`
        );

        setTempPlayersOrder((prev) => {
          const updated = [...prev];
          updated[tempCurrentPlayerIndex] = {
            ...updated[tempCurrentPlayerIndex],
            roll: finalRoll,
          };
          return updated;
        });

        setTempCurrentPlayerIndex((idx) => idx + 1);
        
        if (tempCurrentPlayerIndex === tempPlayersOrder.length - 1) {
          setIsOrderComplete(true);
        }
        
        setIsRolling(false);
      }
    }, 50);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          🎲 Determine Play Order
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Each player rolls to determine turn order
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">Players & Rolls:</h2>
        <div className="space-y-2">
          {tempPlayersOrder.map((p, i) => (
            <div
              key={p.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                tempCurrentPlayerIndex === i
                  ? "bg-indigo-100 border-2 border-indigo-300 scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    tempCurrentPlayerIndex === i
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="font-medium text-gray-800">{p.name}</span>
                {tempCurrentPlayerIndex === i && (
                  <span className="text-indigo-600 font-semibold text-sm animate-pulse">
                    🎯 Current Turn
                  </span>
                )}
              </div>
              <div className="text-right">
                {p.roll !== null ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🎲</span>
                    <span className="text-xl font-bold text-green-600">{p.roll}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Not rolled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button
          onClick={handleRollDice}
          disabled={isRolling || tempCurrentPlayerIndex >= tempPlayersOrder.length}
          className={`flex-1 ${
            isRolling ? "animate-pulse" : ""
          }`}
        >
          {isRolling ? (
            <>🎲 Rolling... {diceRoll}</>
          ) : tempCurrentPlayerIndex >= tempPlayersOrder.length ? (
            "✅ All Rolled"
          ) : (
            `🎲 Roll Dice: ${diceRoll || "?"}`
          )}
        </Button>
        <Button
          color="red"
          onClick={handleReset}
          disabled={isRolling}
          className="flex-1 sm:flex-none"
        >
          🔄 Restart
        </Button>
      </div>

      {message && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 text-sm font-medium">{message}</p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{tempCurrentPlayerIndex}/{tempPlayersOrder.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(tempCurrentPlayerIndex / tempPlayersOrder.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayersOrderForm;