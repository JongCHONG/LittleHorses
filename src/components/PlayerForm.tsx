import { useState, type FormEvent } from "react";
import type { Player } from "../utils/intefaces/player";
import { useDispatch } from "react-redux";
import { addPlayer } from "../utils/slices/playerSlice";
import { getStartPosition } from "../utils/helpers";



const PlayerForm = () => {
  const dispatch = useDispatch();

  const [tempPlayer, setTempPlayer] = useState<Player>({
    id: 0,
    color: "none",
    name: "",
    score: 0,
    pawns: [],
    canPlay: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addPlayer({
        ...tempPlayer,
        canPlay: false,
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
          <span className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
            Name
          </span>
        </label>
      </div>
      <div className="mb-2">
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Color
        </label>
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
      <button
        type="submit"
        className="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:-rotate-2 focus:ring-3 focus:outline-hidden"
      >
        Send
      </button>
    </form>
  );
};

export default PlayerForm;
