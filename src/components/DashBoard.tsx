import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName, setActualPosition } from "../utils/slices/playerSlice";

const DashBoard = () => {
  const dispatch = useDispatch();

  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>("");
  const player = useSelector((state: any) => state.player);

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

        if (player?.canPlay === false && finalRoll === 6) {
          dispatch(setActualPosition({ x: 0, y: 350 }));
        }
      }
    }, 50);
  }, []);

  const handleChangeName = (newName: string) => {
    dispatch(setName(newName));
  };

  return (
    <div className="p-5">
      <div>
        <label htmlFor="name" className="relative">
          <input
            type="text"
            id="name"
            placeholder=""
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
            onChange={(e) => setPlayerName(e.target.value)}
          />

          <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Name
          </span>
        </label>
        <a
          className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
          href="#"
          onClick={() => handleChangeName(playerName)}
        >
          Send
        </a>
      </div>
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
