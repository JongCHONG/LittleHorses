import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import type { Player } from "../utils/intefaces/player";
import { addPlayer } from "../utils/slices/playersSlice";
import { getStartPosition } from "../utils/helpers";
import PawnButton from "./PawnButton";

const PlayerForm = () => {
  const dispatch = useDispatch();
  const selectPlayers = (state: any) => state.players;
  const selectTakenPawnNames = createSelector([selectPlayers], (players) =>
    players.map((p: Player) => p.pawnName)
  );
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pawns = Array.from({ length: numOfPawnsPerTeam }, (_, idx) => ({
      position: {
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
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="name" className="relative block">
          <input
            type="text"
            id="name"
            value={tempPlayer.name}
            onChange={(e) =>
              setTempPlayer({ ...tempPlayer, name: e.target.value })
            }
            placeholder=""
            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm"
            required
          />
          <span className="absolute inset-y-0 start-3 -translate-y-5 bg-[#fafaf0] px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Name
          </span>
        </label>
      </div>
      <div className="mb-2">
        <select
          id="color"
          value={tempPlayer.color}
          onChange={(e) =>
            setTempPlayer({
              ...tempPlayer,
              color: e.target.value as Player["color"],
            })
          }
          className="w-full rounded border-gray-300 shadow-sm sm:text-sm"
          required
        >
          <option value="none" disabled>
            Choose a color
          </option>
          <option
            value="tan"
            disabled={takenColors.includes("tan")}
            style={{ color: "#DAB785" }}
          >
            tan
          </option>
          <option
            value="burntSienna"
            disabled={takenColors.includes("burntSienna")}
            style={{ color: "#C65D4D" }}
          >
            burntSienna
          </option>
          <option
            value="cambridgeBlue"
            disabled={takenColors.includes("cambridgeBlue")}
            style={{ color: "#70A288" }}
          >
            cambridgeBlue
          </option>
          <option
            value="prussianBlue"
            disabled={takenColors.includes("prussianBlue")}
            style={{ color: "#1969a1ff" }}
          >
            prussianBlue
          </option>
        </select>
      </div>
      <div className="mb-5 flex items-center gap-2">
        <label htmlFor="pawnName" className="text-sm font-medium text-gray-700">
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
    </form>
  );
};

export default PlayerForm;
