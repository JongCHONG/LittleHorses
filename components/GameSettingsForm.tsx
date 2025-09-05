"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { setNumOfPawns } from "../utils/slices/numOfPawnsSlice";
import type { Player } from "../utils/intefaces/player";
import { addPlayer } from "../utils/slices/playersSlice";
import { useGameLog } from "../utils/contexts/GameLogContext";

import Button from "./Button";
import SelectionGrid from "./SelectionGrid";

interface GameSettingsFormProps {
  numPlayers: number;
  setNumPlayers: (num: number) => void;
  handleNumPlayersSubmit: (num: number) => void;
}

const GameSettingsForm = ({
  numPlayers,
  setNumPlayers,
  handleNumPlayersSubmit,
}: GameSettingsFormProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [numPawns, setNumPawns] = useState<number | null>(0);
  const { addLog } = useGameLog();

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
    <div className="w-full max-w-md mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          🎮 Game Setup 🎮
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Configure your Little Horses game
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (numPlayers && numPlayers > 0) handleNumPlayersSubmit(numPlayers);
          dispatch(setNumOfPawns(numPawns ?? 0));
          for (let i = 0; i < numPlayers; i++) {
            dispatch(
              addPlayer({ ...initialPlayer, id: i, name: `Player ${i + 1}` })
            );
          }
        }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-gray-700">
            👥 Number of players
          </label>
          <div className="grid grid-cols-4 gap-2">
            <SelectionGrid
              selected={numPlayers}
              onSelect={setNumPlayers}
              selectedColor="indigo"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-gray-700">
            🐎 Pawns per player
          </label>
          <div className="grid grid-cols-4 gap-2">
            <SelectionGrid
              selected={numPawns ?? 0}
              onSelect={setNumPawns}
              selectedColor="green"
            />
          </div>
        </div>

        <div className="pt-4 text-center flex gap-4 justify-center">
          <Button
            type="submit"
            disabled={!numPlayers || !numPawns}
            onClick={() => {
              addLog(
                `🎯 Game started with ${numPlayers} player(s) and ${numPawns} pawn(s) each.`
              );
            }}
          >
            🚀 Start Game
          </Button>
          <Button
            onClick={() => router.push("/rules")}
          >
            📖 Game Rules
          </Button>
        </div>
      </form>

      {numPlayers > 0 && (numPawns ?? 0) > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Game Summary:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • {numPlayers} player{numPlayers > 1 ? "s" : ""}
            </li>
            <li>
              • {numPawns} pawn{(numPawns ?? 0) > 1 ? "s" : ""} each
            </li>
            <li>• {numPlayers * (numPawns ?? 0)} total pawns</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameSettingsForm;
