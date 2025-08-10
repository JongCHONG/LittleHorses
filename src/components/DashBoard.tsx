import { useCallback, useEffect, useState } from "react";
import { rollDice } from "../utils/helpers";
import type { Player } from "../utils/intefaces/player";

const DashBoard = () => {
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [player1, setPlayer1] = useState<Player | null>({
    pawns: [],
    canPlay: false,
  });

  const handleRollDice = useCallback(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let count = 0;
    intervalId = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(intervalId);
        const finalRoll = 6; // ou rollDice();
        setDiceRoll(finalRoll);

        setPlayer1((prev) => {
          if (prev?.canPlay === false && finalRoll === 6) {
            console.log("oucou");
            return {
              color: "tan",
              pawns: [],
              canPlay: true,
              actualPosition: { x: 0, y: 350 },
            };
          }
          return prev;
        });
      }
    }, 50);
  }, []);

  useEffect(() => {
    if (player1) {
      console.log(player1);
    }
  }, [player1]);

  return (
    <div>
      <a
        className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
        href="#"
        onClick={handleRollDice}
      >
        Roll Dice: {diceRoll}
      </a>
    </div>
  );
};

export default DashBoard;
