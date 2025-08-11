import { getPlayerName } from "../utils/helpers";
import type { BoardPosition } from "../utils/intefaces/boardPosition";
import type { Player } from "../utils/intefaces/player";
import BoardElement from "./BoardElement";
import DashBoard from "./DashBoard";
// import Rules from "./Rules";
import { useSelector } from "react-redux";

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
          playerName={getPlayerName("tan", players) ?? ""}
        />
        <BoardElement
          circlePosition={burntSiennaCirclePositions}
          endZonePosition={burntSiennaEndZones}
          name="burntSienna"
          playerName={getPlayerName("burntSienna", players) ?? ""}
        />
        <BoardElement
          circlePosition={cambridgeBlueCirclePositions}
          endZonePosition={cambridgeBlueEndZones}
          name="cambridgeBlue"
          playerName={getPlayerName("cambridgeBlue", players) ?? ""}
        />
        <BoardElement
          circlePosition={prussianBlueCirclePositions}
          endZonePosition={prussianBlueEndZones}
          name="prussianBlue"
          playerName={getPlayerName("prussianBlue", players) ?? ""}
        />
      </div>
      <DashBoard />
    </div>
  );
};

export default Board;
