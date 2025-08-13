import { useState } from "react";
import PlayerForm from "./PlayerForm";
import NumberOfPlayersForm from "./NumberOfPlayersForm";
import type { Player } from "../utils/intefaces/player";
import { useDispatch, useSelector } from "react-redux";
import {
  setPawnActualPosition,
  updatePlayer,
} from "../utils/slices/playerSlice";
import { TanPath } from "../utils/Paths/TanPath";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [showNumPlayersForm, setShowNumPlayersForm] = useState<boolean>(true);
  const players = useSelector((state: { players: Player[] }) => state.players);

  const currentPlayerIndex = useSelector(
    (state: { currentPlayer: { currentPlayerIndex: number } }) =>
      state.currentPlayer.currentPlayerIndex
  );

  const handleRollDice = () => {
    let intervalId: ReturnType<typeof setInterval>;
    let count = 0;
    intervalId = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(intervalId);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceRoll(finalRoll);

        if (finalRoll === 6 && players[currentPlayerIndex].canPlay === false) {
          dispatch(
            updatePlayer({
              id: currentPlayerIndex,
              canPlay: true,
            })
          );
        } else if (players[currentPlayerIndex].canPlay) {
          console.log("hello");

          const pawns = players[currentPlayerIndex].pawns;
          if (pawns && pawns.length > 0) {
            const currentPawnIndex = pawns[0]?.position?.id;
            if (typeof currentPawnIndex === "number") {
              const newIndex = currentPawnIndex + finalRoll;
              console.log("currentPawnIndex:", currentPawnIndex);

              if (newIndex < TanPath.length) {
                dispatch(
                  setPawnActualPosition({
                    index: currentPlayerIndex,
                    position: { ...TanPath[newIndex], id: newIndex },
                  })
                );
              }
            }
          }
        }
      }
    }, 50);
  };

  console.log(TanPath);

  return (
    <div className="p-5">
      {showNumPlayersForm ? (
        <NumberOfPlayersForm
          numPlayers={numPlayers ?? 0}
          setNumPlayers={setNumPlayers}
          setShowNumPlayersForm={setShowNumPlayersForm}
        />
      ) : players.length < numPlayers! ? (
        <PlayerForm />
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
