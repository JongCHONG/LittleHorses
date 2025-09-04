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
      className={`flex items-center px-2 py-1 rounded transition border
        ${
          tempPlayer.pawnName === pawnName
            ? "bg-indigo-200 border-indigo-500"
            : "bg-[#fafaf0] border-transparent"
        }
        ${
          !disabled
            ? "hover:bg-indigo-100 cursor-pointer"
            : "cursor-not-allowed"
        }
      `}
      style={{ opacity: disabled ? 0.5 : 1 }}
      disabled={disabled}
    >
      {pawnName === "Robot" && <TbRobot className="inline-block text-3xl" />}
      {pawnName === "Plane" && (
        <TiPlaneOutline className="inline-block text-3xl" />
      )}
      {pawnName === "Cat" && <FaCat className="inline-block text-3xl" />}
      {pawnName === "Planet" && (
        <IoMdPlanet className="inline-block text-3xl" />
      )}
    </button>
  );
};

export default PawnButton;
