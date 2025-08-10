interface CircleProps {
  color: string;
  x: number;
  y: number;
}

  const Circle = ({ color, x, y }: CircleProps) => {
  return (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 50,      
      height: 50,
      backgroundColor: color,
      borderRadius: "50%",
      border: "2px solid #fff",
      boxSizing: "border-box",
    }}
  />
  );
};

export default Circle;