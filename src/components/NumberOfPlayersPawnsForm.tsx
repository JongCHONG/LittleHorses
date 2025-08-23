import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNumOfPawns } from "../utils/slices/numOfPawnsSlice";
import type { Player } from "../utils/intefaces/player";
import { addPlayer } from "../utils/slices/playersSlice";

interface NumberOfPlayersFormProps {
  numPlayers: number;
  setNumPlayers: (num: number) => void;
  handleNumPlayersSubmit: (num: number) => void;
}

const NumberOfPlayersPawnsForm = ({
  numPlayers,
  setNumPlayers,
  handleNumPlayersSubmit,
}: NumberOfPlayersFormProps) => {
  const dispatch = useDispatch();
  const [numPawns, setNumPawns] = useState<number | null>(0);
  const initialPlayer: Player = {
    id: 0,
    color: "none",
    name: "",
    score: 0,
    pawns: [],
    isReady: false,
    pawnName: "",
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-[#031D44]">
        Set Game Parameters
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (numPlayers && numPlayers > 0) handleNumPlayersSubmit(numPlayers);
          dispatch(setNumOfPawns(numPawns ?? 0));
          for (let i = 0; i < numPlayers; i++) {
            dispatch(addPlayer({ ...initialPlayer, id: i, name: `Player ${i + 1}` }));
          }
        }}
      >
        <label className="block mb-2 text-[#031D44]">
          Choose number of players (1-4):
          <input
            type="number"
            min={1}
            max={4}
            value={numPlayers ?? ""}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
            className="ml-2 border rounded px-2 py-1"
            required
          />
        </label>
        <label className="block mb-2 text-[#031D44]">
          Choose number of pawns per player (1-4):
          <input
            type="number"
            min={1}
            max={4}
            value={numPawns ?? ""}
            onChange={(e) => setNumPawns(Number(e.target.value))}
            className="ml-2 border rounded px-2 py-1"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default NumberOfPlayersPawnsForm;
