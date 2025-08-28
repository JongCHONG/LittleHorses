import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { Player } from "../utils/intefaces/player";
import { setCurrentPlayerIndex } from "../utils/slices/currentSlice";
import { setPlayersOrder } from "../utils/slices/playersOrderSlice";
import GameLog from "./GameLog";
import { useGameLog } from "../utils/contexts/GameLogContext";

type PlayerWithRoll = Player & { roll: number | null };

interface PlayersOrderFormProps {
  onValidated: () => void;
  handleReset: () => void;
}

const PlayersOrderForm = ({
  onValidated,
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

  const handleRollDice = () => {
    if (isRolling) return;
    if (tempCurrentPlayerIndex >= tempPlayersOrder.length) {
      setMessage("Tous les joueurs ont lancé le dé.");
      return;
    }
    setIsRolling(true);
    setMessage("");
    let intervalId: ReturnType<typeof setInterval>;
    let count = 0;
    intervalId = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(intervalId);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(finalRoll);
        addLog(
          `${tempPlayersOrder[tempCurrentPlayerIndex].name} rolled a ${finalRoll}`
        );

        if (tempCurrentPlayerIndex === tempPlayersOrder.length - 1) {
          const finalOrder = [...tempPlayersOrder];
          finalOrder[tempCurrentPlayerIndex] = {
            ...finalOrder[tempCurrentPlayerIndex],
            roll: finalRoll,
          };
          const sortedOrder = finalOrder
            .sort((a, b) => (b.roll ?? 0) - (a.roll ?? 0));
          const orderStr = sortedOrder
            .map((p) => `${p.name} (${p.roll})`)
            .join(" -> ");
          addLog(`Final Order : ${orderStr}`);
        }

        setTempPlayersOrder((prev) => {
          const updated = [...prev];
          updated[tempCurrentPlayerIndex] = {
            ...updated[tempCurrentPlayerIndex],
            roll: finalRoll,
          };
          if (tempCurrentPlayerIndex === updated.length - 1) {
            updated.sort((a, b) => (b.roll ?? 0) - (a.roll ?? 0));
            dispatch(setPlayersOrder(updated.map((p) => p.id)));
            dispatch(setCurrentPlayerIndex(updated[0].id));
            onValidated();
          }
          return updated;
        });

        setTempCurrentPlayerIndex((idx) => idx + 1);
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
      <a
        className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden cursor-pointer"
        href="#"
        onClick={handleRollDice}
      >
        Roll Dice: {diceRoll}
      </a>
      <button
        className="ml-4 inline-block rounded-sm bg-red-800 px-6 py-2 text-sm font-medium text-white transition hover:scale-105 focus:ring-2 focus:outline-none cursor-pointer"
        onClick={handleReset}
        disabled={isRolling}
      >
        Restart
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
      <GameLog height={480} />
    </div>
  );
};

export default PlayersOrderForm;
