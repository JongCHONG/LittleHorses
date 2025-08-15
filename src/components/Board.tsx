import { useSelector } from "react-redux";

import BoardElement from "./BoardElement";
import DashBoard from "./DashBoard";
// import Rules from "./Rules";

import type { BoardPosition } from "../utils/intefaces/boardPosition";
import type { Player } from "../utils/intefaces/player";

interface BoardProps {
  tanCirclePositions: BoardPosition[];
  tanEndZones: BoardPosition[];
  burntSiennaCirclePositions: BoardPosition[];
  burntSiennaEndZones: BoardPosition[];
  cambridgeBlueCirclePositions: BoardPosition[];
  cambridgeBlueEndZones: BoardPosition[];
  prussianBlueCirclePositions: BoardPosition[];
  prussianBlueEndZones: BoardPosition[];
}

const Board = ({
  tanCirclePositions,
  tanEndZones,
  burntSiennaCirclePositions,
  burntSiennaEndZones,
  cambridgeBlueCirclePositions,
  cambridgeBlueEndZones,
  prussianBlueCirclePositions,
  prussianBlueEndZones,
}: BoardProps) => {
  const players = useSelector((state: { players: Player[] }) => state.players);
  const tanPlayer = players.find((player) => player.color === "tan");
  const burntSiennaPlayer = players.find((player) => player.color === "burntSienna");
  const cambridgeBluePlayer = players.find((player) => player.color === "cambridgeBlue");
  const prussianBluePlayer = players.find((player) => player.color === "prussianBlue");

  return (
    <div className="flex">
      {/* <Rules /> */}
      <div
        style={{
          position: "relative",
          width: 850,
          height: 850,
          background: "#fafaf0",
        }}
      >
        <BoardElement
          circlePosition={tanCirclePositions}
          endZonePosition={tanEndZones}
          name="tan"
          player={tanPlayer}
        />
        <BoardElement
          circlePosition={burntSiennaCirclePositions}
          endZonePosition={burntSiennaEndZones}
          name="burntSienna"
          player={burntSiennaPlayer}
        />
        <BoardElement
          circlePosition={cambridgeBlueCirclePositions}
          endZonePosition={cambridgeBlueEndZones}
          name="cambridgeBlue"
          player={cambridgeBluePlayer}
        />
        <BoardElement
          circlePosition={prussianBlueCirclePositions}
          endZonePosition={prussianBlueEndZones}
          name="prussianBlue"
          player={prussianBluePlayer}
        />
      </div>
      <DashBoard />
    </div>
  );
};

export default Board;
