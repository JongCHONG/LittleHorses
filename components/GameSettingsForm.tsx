"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { setNumOfPawns } from "../utils/slices/numOfPawnsSlice";
import type { Player } from "../utils/intefaces/player";
import { addPlayer } from "../utils/slices/playersSlice";
import { useGameLog } from "../utils/contexts/GameLogContext";

import Button from "./Button";

interface NumberOfPlayersFormProps {
  numPlayers: number;
  setNumPlayers: (num: number) => void;
  handleNumPlayersSubmit: (num: number) => void;
}

const GameSettingsForm = ({
  numPlayers,
  setNumPlayers,
  handleNumPlayersSubmit,
}: NumberOfPlayersFormProps) => {
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
          🎮 Game Setup
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
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setNumPlayers(num)}
                className={`h-12 rounded-lg border-2 font-semibold transition-all duration-200 ${
                  numPlayers === num
                    ? "bg-indigo-500 text-white border-indigo-500 shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm sm:text-base font-semibold text-gray-700">
            🐎 Pawns per player
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setNumPawns(num)}
                className={`h-12 rounded-lg border-2 font-semibold transition-all duration-200 ${
                  numPawns === num
                    ? "bg-green-500 text-white border-green-500 shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-300 hover:border-green-300 hover:bg-green-50"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 text-center">
          <Button
            type="submit"
            disabled={!numPlayers || !numPawns}
            onClick={() => {
              addLog(
                `🎯 Game started with ${numPlayers} player(s) and ${numPawns} pawn(s) each.`
              );
            }}
            className="w-full text-base sm:text-lg py-3 sm:py-4"
          >
            🚀 Start Game
          </Button>
        </div>
      </form>

      {numPlayers > 0 && (numPawns ?? 0) > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Game Summary:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• {numPlayers} player{numPlayers > 1 ? 's' : ''}</li>
            <li>• {numPawns} pawn{(numPawns ?? 0) > 1 ? 's' : ''} each</li>
            <li>• {numPlayers * (numPawns ?? 0)} total pawns</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameSettingsForm;
