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

  return (
    <div
      className="absolute w-[50px] h-[50px] border-2 border-white flex items-center justify-center box-border"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
    >
      {!isPawnHere && <span className="text-[whitesmoke]">{num}</span>}
    </div>
  );
};

export default EndZone;
