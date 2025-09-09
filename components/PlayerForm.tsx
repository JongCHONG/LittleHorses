'use client'

import { useState, type FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import GameLog from "./GameLog";
import PawnButton from "./PawnButton";
import CustomSelect from "./CustomSelect";

import type { Player } from "../utils/intefaces/player";
import { updatePlayer } from "../utils/slices/playersSlice";
import { getStartPosition } from "../utils/helpers";
import { setCurrentPlayerIndex } from "../utils/slices/currentSlice";
import { useGameLog } from "../utils/contexts/GameLogContext";
import type { RootState } from "../utils/store";
import Button from "./Button";

interface PlayerFormProps {
  numPlayers: number;
  handleReset?: () => void;
}

const selectPlayers = (state: RootState) => state.players;
const selectTakenPawnNames = createSelector([selectPlayers], (players) =>
  players.map((p: Player) => p.pawnName)
);
const selectTakenColors = createSelector([selectPlayers], (players) =>
  players
    .map((p: Player) => p.color)
    .filter(
      (c): c is Exclude<Player["color"], "none" | undefined> =>
        c !== undefined && c !== "none"
    )
);

const PlayerForm = ({
  numPlayers,
  handleReset,
}: PlayerFormProps) => {
  const dispatch = useDispatch();
  const { addLog } = useGameLog();
  const takenColors = useSelector(selectTakenColors);
  const takenPawnNames = useSelector(selectTakenPawnNames);
  const numOfPawnsPerTeam = useSelector(
    (state: { numOfPawnsPerTeam: number }) => state.numOfPawnsPerTeam
  );
  const playersOrder = useSelector(
    (state: { playersOrder: number[] }) => state.playersOrder
  );
  const currentPlayerIndex = useSelector(
    (state: { current: { currentPlayerIndex: number } }) =>
      state.current.currentPlayerIndex
  );

  const [tempPlayer, setTempPlayer] = useState<Player>({
    id: currentPlayerIndex,
    color: "none",
    name: "",
    score: 0,
    pawns: [],
    isReady: false,
    pawnName: "",
  });

  const isFormValid =
    tempPlayer.color !== "none" &&
    tempPlayer.pawnName !== "" &&
    (tempPlayer.name ?? "").trim() !== "";

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const pawns = Array.from({ length: numOfPawnsPerTeam }, (_, idx) => ({
        lastPosition: null,
        actualPosition: {
          ...getStartPosition(tempPlayer.color ?? "none"),
          id: idx,
        },
        isFinished: false,
        isOnBoard: idx === 0,
      }));
      dispatch(
        updatePlayer({
          ...tempPlayer,
          pawns,
        })
      );
      addLog(`${tempPlayer.name} registered with color ${tempPlayer.color}`);

      const currentOrderIdx = playersOrder.indexOf(currentPlayerIndex);
      const nextPlayerIndex =
        currentOrderIdx !== -1 && currentOrderIdx < playersOrder.length - 1
          ? playersOrder[currentOrderIdx + 1]
          : 0;
      if (currentOrderIdx !== -1 && currentOrderIdx < playersOrder.length - 1) {
        dispatch(setCurrentPlayerIndex(nextPlayerIndex));
        setTempPlayer({
          id: nextPlayerIndex,
          color: "none",
          name: "",
          score: 0,
          pawns: [],
          isReady: false,
          pawnName: "",
        });
      } else {
        dispatch(setCurrentPlayerIndex(playersOrder[0]));
      }
    },
    [
      dispatch,
      tempPlayer,
      numOfPawnsPerTeam,
      playersOrder,
      currentPlayerIndex,
      addLog,
    ]
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">{`Players Registration (${
        playersOrder.indexOf(currentPlayerIndex) + 1
      }/${numPlayers})`}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="relative block">
            <input
              type="text"
              id="name"
              value={tempPlayer.name}
              onChange={(e) =>
                setTempPlayer({ ...tempPlayer, name: e.target.value })
              }
              placeholder=" "
              className="peer w-full rounded-lg border border-gray-300 shadow-sm text-sm sm:text-base h-12 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
              required
            />
            <span
              className={`
              pointer-events-none
              absolute left-4
              bg-white
              px-2
              text-sm sm:text-base
              font-medium
              text-gray-700
              transition-all
              duration-200
              ease-in-out
              ${
                tempPlayer.name
                  ? "-top-2 text-xs sm:text-sm text-indigo-600"
                  : "top-3 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base"
              }
              peer-focus:-top-2 peer-focus:text-xs peer-focus:sm:text-sm peer-focus:text-indigo-600
              `}
            >
              Name
            </span>
          </label>
        </div>

        <div>
          <CustomSelect
            tempPlayer={tempPlayer}
            setTempPlayer={setTempPlayer}
            takenColors={takenColors}
          />
        </div>

        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-3">
            Choose your pawn:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <PawnButton
              pawnName="Robot"
              tempPlayer={tempPlayer}
              setTempPlayer={setTempPlayer}
              disabled={takenPawnNames.includes("Robot")}
            />
            <PawnButton
              pawnName="Cat"
              tempPlayer={tempPlayer}
              setTempPlayer={setTempPlayer}
              disabled={takenPawnNames.includes("Cat")}
            />
            <PawnButton
              pawnName="Plane"
              tempPlayer={tempPlayer}
              setTempPlayer={setTempPlayer}
              disabled={takenPawnNames.includes("Plane")}
            />
            <PawnButton
              pawnName="Planet"
              tempPlayer={tempPlayer}
              setTempPlayer={setTempPlayer}
              disabled={takenPawnNames.includes("Planet")}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            disabled={!isFormValid}
            type="submit"
            className="flex-1"
          >
            Register Player
          </Button>
          <Button
            onClick={handleReset}
            color="red"
            type="button"
            className="flex-1 sm:flex-none"
          >
            Restart Game
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <GameLog height={200} />
      </div>
    </div>
  );
};

export default PlayerForm;
