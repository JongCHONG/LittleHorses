import { useSelector } from "react-redux";
import Circle from "./Circle";

const PlayerOnBoard = () => {
  const player = useSelector((state: any) => state.player);

  console.log(player.actualPosition);

  return (
    <Circle
      color={player.color}
      x={player.actualPosition.x}
      y={player.actualPosition.y}
    />
  );
};

export default PlayerOnBoard;