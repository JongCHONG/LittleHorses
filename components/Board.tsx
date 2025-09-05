'use client'

import { useSelector } from "react-redux";

import BoardElement from "./BoardElement";
import DashBoard from "./DashBoard";

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
  const burntSiennaPlayer = players.find(
    (player) => player.color === "burntSienna"
  );
  const cambridgeBluePlayer = players.find(
    (player) => player.color === "cambridgeBlue"
  );
  const prussianBluePlayer = players.find(
    (player) => player.color === "prussianBlue"
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="flex-1 flex justify-center items-center p-2 sm:p-4">
        <div
          className="relative bg-amber-50 rounded-lg shadow-lg"
          style={{
            width: "min(90vw, 90vh, 850px)",
            height: "min(90vw, 90vh, 850px)",
            aspectRatio: "1/1",
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
          
          <div
            className="absolute w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-white"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "gold",
            }}
          />
        </div>
      </div>
      
      <div className="w-full lg:w-96 xl:w-1/3 lg:max-w-md">
        <DashBoard />
      </div>
    </div>
  );
};

export default Board;
