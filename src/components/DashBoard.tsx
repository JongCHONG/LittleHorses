import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlayerForm from "./PlayerForm";
import NumberOfPlayersPawnsForm from "./NumberOfPlayersPawnsForm";

import {
  setPawnActualPosition,
  updatePlayer,
} from "../utils/slices/playersSlice";
import type { Player } from "../utils/intefaces/player";
import {
  setCurrentPawnIndexByPlayer,
  setCurrentPlayerIndex,
} from "../utils/slices/currentSlice";
import { getRoute, getStartPosition } from "../utils/helpers";
import PlayersOrderForm from "./PlayersOrderForm";
import { colorMap } from "../utils/colorMap";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const [showNumPlayersForm, setShowNumPlayersForm] = useState<boolean>(true);
  const [showPlayersOrderForm, setShowPlayersOrderForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
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
  const playersOrder = useSelector((state: any) => state.playersOrder);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    setGameLog((prev) => [...prev, logEntry]);
  };

  useEffect(() => {
    if (currentPlayer?.pawns && currentPlayer.pawns.length > 0) {
      dispatch(
        setCurrentPawnIndexByPlayer({
          pawns: currentPlayer.pawns,
        })
      );
    }
    if (currentPlayer) {
      if (!currentPlayer?.isReady) {
        addLog(
          `${currentPlayer?.name}'s turn - Roll a 6 to start moving your pawn.`
        );
      } else {
        addLog(`${currentPlayer?.name}'s turn - Roll the dice to move.`);
      }
    }
  }, [currentPlayerIndex, currentPlayer?.pawns, dispatch]);

  // useEffect(() => {
  //   if (currentPlayer) {
  //     if (!currentPlayer?.isReady) {
  //       addLog(
  //         `${currentPlayer?.name}'s turn - Roll a 6 to start moving your pawn.`
  //       );
  //     } else {
  //       addLog(`${currentPlayer?.name}'s turn - Roll the dice to move.`);
  //     }
  //   }
  // }, [currentPlayer]);

  const handleRollDice = () => {
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

        addLog(`${currentPlayer?.name} rolled a ${finalRoll}`);

        if (finalRoll === 6 && currentPlayer.isReady === false) {
          addLog("You rolled a 6! You can now start moving your pawn.");
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
                addLog(
                  `${currentPlayer?.name} moves forward by ${finalRoll} spaces`
                );

                dispatch(
                  setPawnActualPosition({
                    playerIndex: currentPlayerIndex,
                    pawnIndex: currentPawnIndex,
                    position: { ...currentRoute[newIndex], id: newIndex },
                  })
                );
                const currentOrderIdx =
                  playersOrder.indexOf(currentPlayerIndex);
                const nextPlayerIndex =
                  currentOrderIdx !== -1 &&
                  currentOrderIdx < playersOrder.length - 1
                    ? playersOrder[currentOrderIdx + 1]
                    : playersOrder[0];

                dispatch(setCurrentPlayerIndex(nextPlayerIndex));
              } else {
                dispatch(
                  setPawnActualPosition({
                    playerIndex: currentPlayerIndex,
                    pawnIndex: currentPawnIndex,
                    position: { x: 400, y: 400, id: 72 },
                    isFinished: true,
                    isOnBoard: false,
                  })
                );
                const pawns = currentPlayer.pawns;
                const nextPawnIdx = pawns?.findIndex(
                  (p, idx) =>
                    !p.isFinished && !p.isOnBoard && idx !== currentPawnIndex
                );

                if (typeof nextPawnIdx === "number" && nextPawnIdx !== -1) {
                  dispatch(
                    setPawnActualPosition({
                      playerIndex: currentPlayerIndex,
                      pawnIndex: nextPawnIdx,
                      position: {
                        ...getStartPosition(currentPlayer.color ?? "none"),
                        id: 0,
                      },
                      isOnBoard: true,
                    })
                  );
                  addLog(`${currentPlayer?.name}'s next pawn enters the board`);
                }
                const newScore = (currentPlayer.score || 0) + 1;
                if (newScore === currentPlayer?.pawns?.length) {
                  addLog(`🎉 ${currentPlayer.name} WINS THE GAME! 🎉`);
                } else {
                  addLog("You reached the end! Your pawn is finished.");
                }

                dispatch(
                  updatePlayer({
                    id: currentPlayerIndex,
                    score: newScore,
                  })
                );

                const currentOrderIdx =
                  playersOrder.indexOf(currentPlayerIndex);
                const nextPlayerIndex =
                  currentOrderIdx !== -1 &&
                  currentOrderIdx < playersOrder.length - 1
                    ? playersOrder[currentOrderIdx + 1]
                    : playersOrder[0];
                dispatch(setCurrentPlayerIndex(nextPlayerIndex));
              }
            }
          }
        } else {
          addLog(`${currentPlayer?.name} needs a 6 to start moving`);
        }
      }
    }, 50);
  };

  // Après avoir choisi le nombre de joueurs :
  const handleNumPlayersSubmit = (num: number) => {
    setNumPlayers(num);
    setShowNumPlayersForm(false);
    setShowPlayersOrderForm(true);
  };

  // Quand l’ordre est validé dans PlayersOrderForm :
  const handlePlayersOrderValidated = () => {
    setShowPlayersOrderForm(false);
    setShowPlayerForm(true);
  };

  const resetGame = useCallback(() => {
    setDiceRoll(0);
    setGameLog([]);
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
          handleNumPlayersSubmit={handleNumPlayersSubmit}
          gameLog={gameLog}
          handleSetGameLog={setGameLog}
        />
      ) : showPlayersOrderForm ? (
        <PlayersOrderForm
          onValidated={handlePlayersOrderValidated}
          handleReset={resetGame}
        />
      ) : showPlayerForm ? (
        <PlayerForm
          numPlayers={numPlayers ?? 0}
          handleReset={resetGame}
          onAllPlayersRegistered={() => setShowPlayerForm(false)}
        />
      ) : (
        <div
          className="p-4 rounded shadow-md"
          style={{
            backgroundColor:
              colorMap[currentPlayer?.color ?? "none"] || "white",
            transition: "background-color 0.3s ease",
          }}
        >
          <h1 className="text-2xl font-bold mb-4">Game Dashboard</h1>
          <a
            className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:outline-hidden cursor-pointer"
            href="#"
            onClick={handleRollDice}
          >
            Roll Dice: {diceRoll}
          </a>
          <button
            className="ml-4 inline-block rounded-sm bg-red-800 px-6 py-2 text-sm font-medium text-white transition hover:scale-105 focus:ring-2 focus:outline-none cursor-pointer"
            onClick={resetGame}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
