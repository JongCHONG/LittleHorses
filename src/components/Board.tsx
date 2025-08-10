import React from "react";
import Circle from "./Circle";

const Board = ({
  tanCirclePositions,
  burntSiennaCirclePositions,
  cambridgeBlueCirclePositions,
  prussianBlueCirclePositions,
}: any) => {
  return (
    <div
      style={{
        position: "relative",
        width: 850,
        height: 850,
        background: "#fafaf0",
      }}
    >
      <div style={{ width: 350, height: 350, background: "#DAB785" }}>
        <h2>Cercles Bleus</h2>
      </div>
      {tanCirclePositions.map(
        (pos: { x: number; y: number }, i: React.Key | null | undefined) => (
          <Circle key={i} color="#DAB785" x={pos.x} y={pos.y} />
        )
      )}

      <div
        style={{
          width: 350,
          height: 350,
          background: "#C65D4D",
          top: 0,
          position: "absolute",
          right: 0,
        }}
      >
        <h2>Cercles Rouges</h2>
      </div>
      {burntSiennaCirclePositions.map(
        (pos: { x: number; y: number }, i: React.Key | null | undefined) => (
          <Circle key={i} color="#D5896F" x={pos.x} y={pos.y} />
        )
      )}

      <div
        style={{
          width: 350,
          height: 350,
          background: "#70A288",
          bottom: 0,
          position: "absolute",
          right: 0,
        }}
      >
        <h2>Cercles Bleus</h2>
      </div>
      {cambridgeBlueCirclePositions.map(
        (pos: { x: number; y: number }, i: React.Key | null | undefined) => (
          <Circle key={i} color="#70A288" x={pos.x} y={pos.y} />
        )
      )}

      <div
        style={{
          width: 350,
          height: 350,
          background: "#1969a1ff",
          bottom: 0,
          position: "absolute",
          left: 0,
        }}
      >
        <h2>Cercles Prussiens</h2>
      </div>
      {prussianBlueCirclePositions.map(
        (pos: { x: number; y: number }, i: React.Key | null | undefined) => (
          <Circle key={i} color="#1969a1ff" x={pos.x} y={pos.y} />
        )
      )}
    </div>
  );
};

export default Board;
