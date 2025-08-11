interface PawnPositionProps {
  x: number;
  y: number;
}

const PawnPosition = ({ x, y }: PawnPositionProps) => {
  return (
    <div
      className="absolute  w-[50px] h-[50px] flex items-center justify-center"
      style={{ left: x, top: y }}
    >
      <p>e</p>
    </div>
  );
};

export default PawnPosition;
