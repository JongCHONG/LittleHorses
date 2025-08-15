import React, { type CSSProperties } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TbRobot } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { FaCat } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";

import EndZone from "./EndZone";
import Circle from "./Circle";
import PlayerOnBoard from "./PlayersOnBoard";

import type { BoardPosition } from "../utils/intefaces/boardPosition";
import type { Player } from "../utils/intefaces/player";

interface BoardElementProps {
  circlePosition: BoardPosition[];
  endZonePosition: BoardPosition[];
  name: "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue";
  player: Player | undefined;
}

const cssStyles: {
  [key in "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue"]: {
    color: string;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    position?: string;
  };
} = {
  tan: {
    color: "#DAB785",
  },
  burntSienna: {
    color: "#C65D4D",
    top: 0,
    right: 0,
    position: "absolute",
  },
  cambridgeBlue: {
    color: "#70A288",
    bottom: 0,
    right: 0,
    position: "absolute",
  },
  prussianBlue: {
    color: "#1969a1ff",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
};

const BoardElement = ({
  circlePosition,
  endZonePosition,
  name,
  player,
}: BoardElementProps) => {
  const TileNames = {
    tan: "Tan",
    burntSienna: "Burnt Sienna",
    cambridgeBlue: "Cambridge Blue",
    prussianBlue: "Prussian Blue",
  };

  return (
    <>
      <div
        className="absolute flex flex-col items-center justify-center text-[whitesmoke]"
        style={{
          width: 350,
          height: 350,
          background: cssStyles[name].color,
          top: cssStyles[name].top,
          right: cssStyles[name].right,
          bottom: cssStyles[name].bottom,
          left: cssStyles[name].left,
          position: cssStyles[name].position as CSSProperties["position"],
        }}
      >
        <h2 className="mb-1">{TileNames[name]}</h2>
        {player && (
          <>
            <p>Player : {player?.name}</p>
            <p>Ready : {player?.isReady ? "Yes" : "No"}</p>
            <p>Score : {player?.score || 0}</p>
            <div className="flex gap-1 items-center mt-2">
              {player?.pawns?.filter((p) => !p.isFinished).length === 1
                ? "Last pawn !"
                : "Pawns :"}
              {Array.from({
                length: Math.max(
                  (player?.pawns?.filter((p) => !p.isFinished).length ?? 0) - 1,
                  0
                ),
              }).map((_, idx) =>
                player?.pawnName === "Robot" ? (
                  <TbRobot key={idx} size={28} />
                ) : player?.pawnName === "Plane" ? (
                  <TiPlaneOutline key={idx} size={28} />
                ) : player?.pawnName === "Cat" ? (
                  <FaCat key={idx} size={28} />
                ) : player?.pawnName === "Planet" ? (
                  <IoMdPlanet key={idx} size={28} />
                ) : null
              )}
            </div>
          </>
        )}
      </div>
      {circlePosition.map(
        (pos: { x: number; y: number }, i: React.Key | null | undefined) => (
          <Circle key={i} color={cssStyles[name].color} x={pos.x} y={pos.y} />
        )
      )}
      {endZonePosition.map((pos: { x: number; y: number }, i: number) => (
        <EndZone
          key={uuidv4()}
          color={cssStyles[name].color}
          x={pos.x}
          y={pos.y}
          num={i + 1}
        />
      ))}
      <PlayerOnBoard />
    </>
  );
};

export default BoardElement;
