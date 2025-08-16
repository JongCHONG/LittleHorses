import { useState } from "react";
import { useSelector } from "react-redux";

import type { Player } from "../utils/intefaces/player";

type PlayerWithRoll = Player & { roll: number | null };

const PlayersOrderForm = () => {
  const players = useSelector((state: { players: Player[] }) => state.players);
  const [playersOrder, setPlayersOrder] = useState<PlayerWithRoll[]>(
    players.map((p) => ({ ...p, roll: null }))
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const handleRollDice = () => {
    if (currentPlayerIndex >= playersOrder.length) {
      setMessage("Tous les joueurs ont lancé le dé.");
      return;
    }
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

        // Met à jour le score du joueur courant
        setPlayersOrder((prev) => {
          const updated = [...prev];
          updated[currentPlayerIndex] = {
            ...updated[currentPlayerIndex],
            roll: finalRoll,
          };
          // Trie si tous les joueurs ont lancé
          if (currentPlayerIndex === updated.length - 1) {
            updated.sort((a, b) => (b.roll ?? 0) - (a.roll ?? 0));
          }
          return updated;
        });

        setCurrentPlayerIndex((idx) => idx + 1);
      }
    }, 50);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Players Order</h1>
      <div className="mb-4">
        {playersOrder.map((p, i) => (
          <div key={p.id}>
            {i + 1}. {p.name} {p.roll !== null ? `: ${p.roll}` : ""}
            {currentPlayerIndex === i && <span> ← à lancer</span>}
          </div>
        ))}
      </div>
      <a
        className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
        href="#"
        onClick={handleRollDice}
      >
        Roll Dice: {diceRoll}
      </a>
      <button
        className="ml-4 inline-block rounded-sm bg-red-800 px-6 py-2 text-sm font-medium text-white transition hover:scale-105 focus:ring-2 focus:outline-none"
        // onClick={resetGame}
      >
        Restart
      </button>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default PlayersOrderForm;
