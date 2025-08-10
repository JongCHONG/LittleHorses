import type { BoardPosition } from "../utils/intefaces/boardPosition";
import BoardElement from "./BoardElement";
import DashBoard from "./DashBoard";
import Rules from "./Rules";

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
        />
        <BoardElement
          circlePosition={burntSiennaCirclePositions}
          endZonePosition={burntSiennaEndZones}
          name="burntSienna"
        />
        <BoardElement
          circlePosition={cambridgeBlueCirclePositions}
          endZonePosition={cambridgeBlueEndZones}
          name="cambridgeBlue"
        />
        <BoardElement
          circlePosition={prussianBlueCirclePositions}
          endZonePosition={prussianBlueEndZones}
          name="prussianBlue"
        />
      </div>
      <DashBoard />
    </div>
  );
};

export default Board;
