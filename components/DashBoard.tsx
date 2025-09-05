"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlayerForm from "./PlayerForm";
import NumberOfPlayersPawnsForm from "./GameSettingsForm";

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
import { useGameLog } from "../utils/contexts/GameLogContext";
import GameLog from "./GameLog";
import Button from "./Button";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { addLog, clearLog } = useGameLog();
  const [diceRoll, setDiceRoll] = useState<number>(0);
  const [numPlayers, setNumPlayers] = useState<number | null>(null);
  const players = useSelector((state: { players: Player[] }) => state.players);

  const numOfPawn = useSelector(
    (state: { numOfPawnsPerTeam: number }) => state.numOfPawnsPerTeam
  );
  const hasDefaultPlayer = players.some((player) =>
    player.name?.toLowerCase().includes("player")
  );

  const currentPlayerIndex = useSelector(
    (state: { current: { currentPlayerIndex: number } }) =>
      state.current.currentPlayerIndex
  );
  const currentPlayer = players[currentPlayerIndex];
  const currentPawnIndex = useSelector(
    (state: { current: { currentPawnIndexByPlayer: number } }) =>
      state.current.currentPawnIndexByPlayer
  );
  const playersOrder = useSelector(
    (state: { playersOrder: number[] }) => state.playersOrder
  );

  useEffect(() => {
    if (currentPlayer?.pawns && currentPlayer.pawns.length > 0) {
      dispatch(
        setCurrentPawnIndexByPlayer({
          pawns: currentPlayer.pawns,
        })
      );
    }
    if (players) {
      const numPlayers = players.length;
      setNumPlayers(numPlayers);
    }
  }, [currentPlayerIndex, currentPlayer?.pawns, dispatch]);

  const handleRollDice = () => {
    let count = 0;
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
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

  const handleNumPlayersSubmit = (num: number) => {
    setNumPlayers(num);
  };

  const resetGame = useCallback(() => {
    setDiceRoll(0);
    clearLog();
    setNumPlayers(null);
    dispatch({ type: "RESET_GAME" });
  }, [dispatch, clearLog]);

  return (
    <div className="h-full flex flex-col p-3 sm:p-5">
      {numOfPawn === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <NumberOfPlayersPawnsForm
            numPlayers={numPlayers ?? 0}
            setNumPlayers={setNumPlayers}
            handleNumPlayersSubmit={handleNumPlayersSubmit}
          />
        </div>
      ) : numOfPawn !== 0 && playersOrder.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <PlayersOrderForm handleReset={resetGame} />
        </div>
      ) : hasDefaultPlayer ? (
        <div className="flex-1 flex items-center justify-center">
          <PlayerForm numPlayers={numPlayers ?? 0} handleReset={resetGame} />
        </div>
      ) : (
        <div className="h-full flex flex-col">
          <div
            className="rounded-lg shadow-md p-4 sm:p-6 mb-4"
            style={{
              backgroundColor:
                colorMap[currentPlayer?.color ?? "none"] || "white",
              transition: "background-color 0.3s ease",
            }}
          >
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              Game Dashboard
            </h1>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Ordre des joueurs :
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-1">
                {playersOrder.map((playerIdx: number) => (
                  <div
                    key={playerIdx}
                    className={`px-2 py-1 rounded text-sm ${
                      playerIdx === currentPlayerIndex
                        ? "bg-indigo-100 font-bold text-indigo-700"
                        : "text-gray-600"
                    }`}
                  >
                    {players[playerIdx]?.name || `Joueur ${playerIdx + 1}`}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
              <Button onClick={handleRollDice}>Roll Dice: {diceRoll}</Button>
              <Button color="red" onClick={resetGame}>
                Restart
              </Button>
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <GameLog />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
