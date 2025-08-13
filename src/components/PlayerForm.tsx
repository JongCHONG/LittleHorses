import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";

import type { Player } from "../utils/intefaces/player";
import { addPlayer } from "../utils/slices/playersSlice";
import { getStartPosition } from "../utils/helpers";

import { TbRobot } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { FaCat } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";

const PlayerForm = () => {
  const dispatch = useDispatch();

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
    dispatch(
      addPlayer({
        ...tempPlayer,
        isReady: false,
        pawns: [
          {
            position: {
              ...getStartPosition(tempPlayer.color ?? "none"),
              id: 0,
            },
            isFinished: false,
          },
        ],
      })
    );
    setTempPlayer({
      ...tempPlayer,
      id: tempPlayer.id + 1,
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
          <option value="tan">tan</option>
          <option value="burntSienna">burntSienna</option>
          <option value="cambridgeBlue">cambridgeBlue</option>
          <option value="prussianBlue">prussianBlue</option>
        </select>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="pawnName" className="text-sm font-medium text-gray-700">
          Choose your pawn :
        </label>
        <button
          type="button"
          onClick={() =>
            setTempPlayer({
              ...tempPlayer,
              pawnName: tempPlayer.pawnName === "Robot" ? "" : "Robot",
            })
          }
          className={`flex items-center px-2 py-1 rounded ${
            tempPlayer.pawnName === "Robot"
              ? "bg-indigo-200 border border-indigo-500"
              : "bg-[#fafaf0]"
          }`}
        >
          <TbRobot className="inline-block text-3xl" />
        </button>
        <button
          type="button"
          onClick={() =>
            setTempPlayer({
              ...tempPlayer,
              pawnName: tempPlayer.pawnName === "Cat" ? "" : "Cat",
            })
          }
          className={`flex items-center px-2 py-1 rounded ${
            tempPlayer.pawnName === "Cat"
              ? "bg-indigo-200 border border-indigo-500"
              : "bg-[#fafaf0]"
          }`}
        >
          <FaCat className="inline-block text-3xl" />
        </button>
        <button
          type="button"
          onClick={() =>
            setTempPlayer({
              ...tempPlayer,
              pawnName: tempPlayer.pawnName === "Plane" ? "" : "Plane",
            })
          }
          className={`flex items-center px-2 py-1 rounded ${
            tempPlayer.pawnName === "Plane"
              ? "bg-indigo-200 border border-indigo-500"
              : "bg-[#fafaf0]"
          }`}
        >
          <TiPlaneOutline className="inline-block text-3xl" />
        </button>
        <button
          type="button"
          onClick={() =>
            setTempPlayer({
              ...tempPlayer,
              pawnName: tempPlayer.pawnName === "Planet" ? "" : "Planet",
            })
          }
          className={`flex items-center px-2 py-1 rounded ${
            tempPlayer.pawnName === "Planet"
              ? "bg-indigo-200 border border-indigo-500"
              : "bg-[#fafaf0]"
          }`}
        >
          <IoMdPlanet className="inline-block text-3xl" />
        </button>
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
