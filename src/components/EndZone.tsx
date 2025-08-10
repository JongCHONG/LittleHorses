interface SquareProps {
  color: string;
  x: number;
  y: number;
  num: number;
}

const EndZone = ({ color, x, y, num }: SquareProps) => {
  return (
    <div
      className="absolute w-[50px] h-[50px] border-2 border-white flex items-center justify-center box-border"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
    >
      <span>{num}</span>
    </div>
  );
};

export default EndZone;
