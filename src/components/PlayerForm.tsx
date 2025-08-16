import { useState, type FormEvent, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import type { Player } from "../utils/intefaces/player";
import { addPlayer } from "../utils/slices/playersSlice";
import { getStartPosition } from "../utils/helpers";
import PawnButton from "./PawnButton";
import CustomSelect from "./CustomSelect";

interface PlayerFormProps {
  numPlayers: number;
  handleReset?: () => void;
}

const PlayerForm = ({ numPlayers, handleReset }: PlayerFormProps) => {
  const dispatch = useDispatch();
  const selectPlayers = (state: any) => state.players;
  const selectTakenPawnNames = createSelector([selectPlayers], (players) =>
    players.map((p: Player) => p.pawnName)
  );
  const players = useSelector((state: any) => state.players);
  const takenColors = useSelector((state: any) =>
    state.players.map((p: Player) => p.color)
  );
  const takenPawnNames = useSelector(selectTakenPawnNames);
  const numOfPawnsPerTeam = useSelector(
    (state: { numOfPawnsPerTeam: number }) => state.numOfPawnsPerTeam
  );

  const [tempPlayer, setTempPlayer] = useState<Player>({
    id: 0,
    color: "none",
    name: "",
    score: 0,
    pawns: [],
    isReady: false,
    pawnName: "",
  });

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
      }));
      dispatch(
        addPlayer({
          ...tempPlayer,
          isReady: false,
          pawns,
        })
      );
      setTempPlayer({
        id: tempPlayer.id + 1,
        color: "none",
        name: "",
        score: 0,
        pawns: [],
        isReady: false,
        pawnName: "",
      });
    },
    [dispatch, tempPlayer, numOfPawnsPerTeam]
  );

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        {players.length < numPlayers!
          ? `Register player ${players.length + 1}${
              numPlayers! > 1 ? ` of ${numPlayers}` : ""
            }`
          : "Register Player"}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2 mt-5">
          <label htmlFor="name" className="relative block">
            <input
              type="text"
              id="name"
              value={tempPlayer.name}
              onChange={(e) =>
                setTempPlayer({ ...tempPlayer, name: e.target.value })
              }
              placeholder=" "
              className="peer mt-0.5 w-full rounded border border-gray-300 shadow-sm sm:text-sm h-10 px-3"
              required
            />
            <span
              className={`
              pointer-events-none
              absolute left-3
              bg-white
              px-1
              text-base
              font-medium
              text-gray-700
              transition-all
              duration-200
              ease-in-out
              ${
                tempPlayer.name
                  ? "-top-3 text-xs"
                  : "top-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base"
              }
              peer-focus:-top-3 peer-focus:text-xs
              `}
            >
              Name
            </span>
          </label>
        </div>
        <div className="mb-2">
          <CustomSelect
            tempPlayer={tempPlayer}
            setTempPlayer={setTempPlayer}
            takenColors={takenColors}
          />
        </div>
        <div className="mb-5 flex items-center gap-2">
          <label
            htmlFor="pawnName"
            className="text-sm font-medium text-gray-700"
          >
            Choose your pawn :
          </label>
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
        <button
          type="submit"
          className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
        >
          Register
        </button>
        <button
          className="ml-4 inline-block rounded-sm bg-red-800 px-6 py-2 text-sm font-medium text-white transition hover:scale-105 focus:ring-2 focus:outline-none"
          onClick={handleReset}
        >
          Restart
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
