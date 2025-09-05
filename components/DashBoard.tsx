"use client";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlayerForm from "./PlayerForm";
import GameSettingsForm from "./GameSettingsForm";

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
import { useGameLog } from "../utils/contexts/GameLogContext";

import GameControls from "./GameControls";

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
          <GameSettingsForm
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
        <GameControls
          currentPlayer={currentPlayer}
          playersOrder={playersOrder}
          diceRoll={diceRoll}
          onDiceRoll={handleRollDice}
          onRestart={resetGame}
          players={players}
          currentPlayerIndex={currentPlayerIndex}
        />
      )}
    </div>
  );
};

export default DashBoard;
