'use client'

import { TbRobot } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { FaCat } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";

import type { Player } from "../utils/intefaces/player";

interface PawnButtonProps {
  pawnName: string;
  tempPlayer: Player;
  setTempPlayer: (player: Player) => void;
  disabled: boolean;
}

const PawnButton = ({
  pawnName,
  tempPlayer,
  setTempPlayer,
  disabled,
}: PawnButtonProps) => {
  return (
    <button
      type="button"
      onClick={() =>
        setTempPlayer({
          ...tempPlayer,
          pawnName: tempPlayer.pawnName === pawnName ? "" : pawnName,
        })
      }
      className={`flex items-center justify-center p-2 sm:px-3 sm:py-2 rounded-lg transition-all duration-200 border-2 min-h-[48px] min-w-[48px] sm:min-h-[56px] sm:min-w-[56px]
        ${
          tempPlayer.pawnName === pawnName
            ? "bg-indigo-200 border-indigo-500 shadow-md scale-105"
            : "bg-white border-gray-300 hover:border-indigo-300 shadow-sm"
        }
        ${
          !disabled
            ? "hover:bg-indigo-100 hover:scale-105 active:scale-95 cursor-pointer"
            : "cursor-not-allowed opacity-50"
        }
      `}
      disabled={disabled}
      aria-label={`Select ${pawnName} pawn`}
    >
      {pawnName === "Robot" && <TbRobot className="text-2xl sm:text-3xl text-gray-700" />}
      {pawnName === "Plane" && (
        <TiPlaneOutline className="text-2xl sm:text-3xl text-gray-700" />
      )}
      {pawnName === "Cat" && <FaCat className="text-2xl sm:text-3xl text-gray-700" />}
      {pawnName === "Planet" && (
        <IoMdPlanet className="text-2xl sm:text-3xl text-gray-700" />
      )}
    </button>
  );
};

export default PawnButton;
