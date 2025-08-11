import { useCallback, useState } from "react";
import PlayerForm from "./PlayerForm";
import NumberOfPlayersForm from "./NumberOfPlayersForm";
import type { Player } from "../utils/intefaces/player";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [showPlayerForm, setShowPlayerForm] = useState<boolean>(false);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [showNumPlayersForm, setShowNumPlayersForm] = useState<boolean>(true);
  const players = useSelector((state: { players: Player[] }) => state.players);
  const currentPlayerIndex = useSelector(
    (state: { currentPlayer: { currentPlayerIndex: number } }) =>
      state.currentPlayer.currentPlayerIndex
  );

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

        if (finalRoll === 6 && players.length < numPlayers!) {
          setShowPlayerForm(true);
        }
      }
    }, 50);
  }, [numPlayers, players.length]);

  return (
    <div className="p-5">
      {showNumPlayersForm ? (
        <NumberOfPlayersForm
          numPlayers={numPlayers ?? 0}
          setNumPlayers={setNumPlayers}
          setShowNumPlayersForm={setShowNumPlayersForm}
          setShowPlayerForm={setShowPlayerForm}
        />
      ) : players.length < numPlayers! ? (
        <PlayerForm handleFormClose={() => setShowPlayerForm(false)} />
      ) : (
        <>
          <a
            className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
            href="#"
            onClick={handleRollDice}
          >
            Roll Dice: {diceRoll}
          </a>
          <br /> <br />
        </>
      )}
    </div>
  );
};

export default DashBoard;
