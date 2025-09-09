'use client'

interface SquareProps {
  color: string;
  x: number;
  y: number;
  num: number;
  pawnPositions?: { x: number; y: number }[];
}

const EndZone = ({ color, x, y, num, pawnPositions = [] }: SquareProps) => {
  const isPawnHere = pawnPositions.some((pos) => pos.x === x && pos.y === y);
  const zoneSize = `min(50px, 5.88vw, 5.88vh)`;

  return (
    <div
      className="absolute border-2 border-white flex items-center justify-center transition-all duration-200 hover:scale-105"
      style={{
        width: zoneSize,
        height: zoneSize,
        left: `min(${x}px, ${(x / 850) * 100}%)`,
        top: `min(${y}px, ${(y / 850) * 100}%)`,
        backgroundColor: color,
        boxSizing: 'border-box',
      }}
    >
      {!isPawnHere && (
        <span 
          className="text-white font-bold"
          style={{ fontSize: `min(16px, 2.35vw, 2.35vh)` }}
        >
          {num}
        </span>
      )}
    </div>
  );
};

export default EndZone;
