'use client'

interface CircleProps {
  color: string;
  x: number;
  y: number;
}

const Circle = ({ color, x, y }: CircleProps) => {
  const circleSize = `min(50px, 5.88vw, 5.88vh)`;
  
  return (
    <div
      className="absolute rounded-full border-2 border-white transition-all duration-200 hover:scale-110"
      style={{
        width: circleSize,
        height: circleSize,
        left: `min(${x}px, ${(x / 850) * 100}%)`,
        top: `min(${y}px, ${(y / 850) * 100}%)`,
        backgroundColor: color,
        boxSizing: 'border-box',
      }}
    />
  );
};

export default Circle;
