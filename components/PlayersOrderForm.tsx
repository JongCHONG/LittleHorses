'use client'

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { Player } from "../utils/intefaces/player";
import { setCurrentPlayerIndex } from "../utils/slices/currentSlice";
import { setPlayersOrder } from "../utils/slices/playersOrderSlice";
import GameLog from "./GameLog";
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
    <div className="bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Players Order</h1>
      <div className="mb-4 h-25">
        {tempPlayersOrder.map((p, i) => (
          <div key={p.id}>
            {i + 1}. {p.name} {p.roll !== null ? `: ${p.roll}` : ""}
            {tempCurrentPlayerIndex === i && <span> ← à lancer</span>}
          </div>
        ))}
      </div>
      <Button
        onClick={handleRollDice}
      >
        Roll Dice: {diceRoll}
      </Button>
      <Button
        color="red"
        onClick={handleReset}
        disabled={isRolling}
      >
        Restart
      </Button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
      <GameLog height={480} />
    </div>
  );
};

export default PlayersOrderForm;