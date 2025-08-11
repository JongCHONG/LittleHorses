import { useCallback, useState } from "react";
import PlayerForm from "./PlayerForm";
import NumberOfPlayersForm from "./NumberOfPlayersForm";

const DashBoard = () => {
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [showPlayerForm, setShowPlayerForm] = useState<boolean>(false);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [showNumPlayersForm, setShowNumPlayersForm] = useState<boolean>(true);

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

        if (finalRoll === 6) {
          setShowPlayerForm(true);
        }
      }
    }, 50);
  }, []);

  return (
    <div className="p-5">
      {showNumPlayersForm ? (
        <NumberOfPlayersForm
          numPlayers={numPlayers ?? 0}
          setNumPlayers={setNumPlayers}
          setShowNumPlayersForm={setShowNumPlayersForm}
        />
      ) : (
        <a
          className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
          href="#"
          onClick={handleRollDice}
        >
          Roll Dice: {diceRoll}
        </a>
      )}
      <br /> <br />
      {showPlayerForm && (
        <PlayerForm handleFormClose={() => setShowPlayerForm(false)} />
      )}
    </div>
  );
};

export default DashBoard;
