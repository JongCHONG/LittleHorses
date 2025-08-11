import React, { type CSSProperties } from "react";
import EndZone from "./EndZone";
import Circle from "./Circle";
import type { BoardPosition } from "../utils/intefaces/boardPosition";
import PlayerOnBoard from "./PlayersOnBoard";
import { v4 as uuidv4 } from "uuid";

interface BoardElementProps {
  circlePosition: BoardPosition[];
  endZonePosition: BoardPosition[];
  name: "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue";
  playerName: string;
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
  playerName,
}: BoardElementProps) => {
  return (
    <>
      <div
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
        <h2>{name}</h2>
        <p>Player: {playerName}</p>
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
