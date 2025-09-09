'use client'

interface CircleProps {
  color: string;
  x: number;
  y: number;
}

const Circle = ({ color, x, y }: CircleProps) => {
  return (
    <div
      className="absolute w-[50px] h-[50px] rounded-full border-2 border-white box-border"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
      }}
    />
  );
};

export default Circle;
