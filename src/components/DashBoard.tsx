import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlayerForm from "./PlayerForm";
import NumberOfPlayersPawnsForm from "./NumberOfPlayersPawnsForm";

import {
  setPawnActualPosition,
  updatePlayer,
} from "../utils/slices/playersSlice";
import type { Player } from "../utils/intefaces/player";
import { setCurrentPawnIndexByPlayer } from "../utils/slices/currentSlice";
import { getRoute } from "../utils/helpers";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [showNumPlayersForm, setShowNumPlayersForm] = useState<boolean>(true);
  const players = useSelector((state: { players: Player[] }) => state.players);

  const currentPlayerIndex = useSelector(
    (state: { current: { currentPlayerIndex: number } }) =>
      state.current.currentPlayerIndex
  );
  const currentPlayer = players[currentPlayerIndex];
  const currentPawnIndex = useSelector(
    (state: { current: { currentPawnIndexByPlayer: number } }) =>
      state.current.currentPawnIndexByPlayer
  );

  useEffect(() => {
    if (currentPlayer?.pawns && currentPlayer.pawns.length > 0) {
      dispatch(
        setCurrentPawnIndexByPlayer({
          pawns: currentPlayer.pawns,
        })
      );
    }
    if (!currentPlayer?.isReady) {
      setMessage("You need to roll a 6 to start moving your pawn.");
    }
  }, [currentPlayer?.pawns, dispatch]);

  const handleRollDice = () => {
    if (message) {
      setMessage("");
    }
    let intervalId: ReturnType<typeof setInterval>;
    let count = 0;
    intervalId = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(intervalId);
        // const finalRoll = Math.floor(Math.random() * 6) + 1;
        const finalRoll = 6;
        setDiceRoll(finalRoll);

        if (finalRoll === 6 && currentPlayer.isReady === false) {
          setMessage("You rolled a 6! You can move your pawn.");
          dispatch(
            updatePlayer({
              id: currentPlayerIndex,
              isReady: true,
            })
          );
        } else if (currentPlayer.isReady) {
          const pawns = currentPlayer.pawns;
          const currentRoute = currentPlayer.color
            ? getRoute(currentPlayer.color)
            : [];
          if (pawns && pawns.length > 0) {
            const pawnPositionId = pawns[currentPawnIndex]?.actualPosition?.id;
            if (typeof pawnPositionId === "number") {
              const newIndex = pawnPositionId + finalRoll;
              if (newIndex < currentRoute.length) {
                dispatch(
                  setPawnActualPosition({
                    playerIndex: currentPlayerIndex,
                    pawnIndex: currentPawnIndex,
                    position: { ...currentRoute[newIndex], id: newIndex },
                  })
                );
              } else {
                dispatch(
                  setPawnActualPosition({
                    playerIndex: currentPlayerIndex,
                    pawnIndex: currentPawnIndex,
                    position: { x: 400, y: 400, id: 72 },
                    isFinished: true,
                  })
                );
                const newScore = (currentPlayer.score || 0) + 1;
                if (newScore === currentPlayer?.pawns?.length) {
                  setMessage(
                    `Congratulations ${currentPlayer.name}, you won the game!`
                  );
                } else {
                  setMessage("You reached the end! Your pawn is finished.");
                }

                dispatch(
                  updatePlayer({
                    id: currentPlayerIndex,
                    score: newScore,
                  })
                );
              }
            }
          }
        }
      }
    }, 50);
  };

  const resetGame = useCallback(() => {
    setDiceRoll(0);
    setMessage("");
    setNumPlayers(null);
    setShowNumPlayersForm(true);
    dispatch({ type: "RESET_GAME" });
  }, [dispatch]);

  return (
    <div className="p-5">
      {showNumPlayersForm ? (
        <NumberOfPlayersPawnsForm
          numPlayers={numPlayers ?? 0}
          setNumPlayers={setNumPlayers}
          setShowNumPlayersForm={setShowNumPlayersForm}
        />
      ) : players.length < numPlayers! ? (
        <PlayerForm numPlayers={numPlayers!} handleReset={resetGame} />
      ) : (
        <div className="bg-white p-4 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Game Board</h1>
          <a
            className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
            href="#"
            onClick={handleRollDice}
          >
            Roll Dice: {diceRoll}
          </a>
          <button
            className="ml-4 inline-block rounded-sm bg-red-800 px-6 py-2 text-sm font-medium text-white transition hover:scale-105 focus:ring-2 focus:outline-none"
            onClick={resetGame}
          >
            Restart
          </button>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
