'use client'

import React, { type CSSProperties } from "react";
import { TbRobot } from "react-icons/tb";
import { TiPlaneOutline } from "react-icons/ti";
import { FaCat } from "react-icons/fa";
import { IoMdPlanet } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

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

  const numOfPawns = player?.pawns?.length ?? 0;

  return (
    <>
      <div
        className="absolute flex flex-col items-center justify-center text-white p-2 sm:p-3"
        style={{
          width: "min(350px, 41.18%)", 
          height: "min(350px, 41.18%)",
          background: cssStyles[name].color,
          top: cssStyles[name].top,
          right: cssStyles[name].right,
          bottom: cssStyles[name].bottom,
          left: cssStyles[name].left,
          position: cssStyles[name].position as CSSProperties["position"],
        }}
      >
        <h2 className="mb-1 text-sm sm:text-base md:text-lg font-semibold text-center">
          {TileNames[name]}
        </h2>
        {player && (
          <>
            <p className="text-xs sm:text-sm mb-1">Player : {player?.name}</p>
            <p className="text-xs sm:text-sm mb-1">Ready : {player?.isReady ? "Yes" : "No"}</p>
            <p className="text-xs sm:text-sm mb-2">Score : {player?.score || 0}</p>
            <div className="flex gap-1 items-center mt-1 flex-wrap justify-center">
              <span className="text-xs sm:text-sm">
                {player?.score === numOfPawns
                  ? "🏆 Winner!"
                  : player?.pawns?.filter((p) => !p.isFinished).length === 1
                  ? "🔥 Last pawn!"
                  : "Pawns :"}
              </span>
              <div className="flex gap-1 flex-wrap">
                {Array.from({
                  length: Math.max(
                    (player?.pawns?.filter((p) => !p.isFinished).length ?? 0) - 1,
                    0
                  ),
                }).map((_, idx) =>
                  player?.pawnName === "Robot" ? (
                    <TbRobot key={idx} className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  ) : player?.pawnName === "Plane" ? (
                    <TiPlaneOutline key={idx} className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  ) : player?.pawnName === "Cat" ? (
                    <FaCat key={idx} className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  ) : player?.pawnName === "Planet" ? (
                    <IoMdPlanet key={idx} className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  ) : null
                )}
              </div>
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
          pawnPositions={
            player?.pawns
              ?.map((p) => p.actualPosition)
              ?.filter(
                (pos): pos is { x: number; y: number; id: number } =>
                  pos !== null
              )
              ?.map(({ x, y }) => ({ x, y })) ?? []
          }
        />
      ))}
      <PlayerOnBoard />
    </>
  );
};

export default BoardElement;
