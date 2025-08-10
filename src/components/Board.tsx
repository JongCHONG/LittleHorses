import React from "react";
import Circle from "./Circle";

const Board = ({ tanCirclePositions }: any) => {
  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 800,
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
      {/* Recommence pour chaque zone de couleur (rouge, bleu, vert) en changeant la couleur ! */}
    </div>
  );
};

export default Board;
