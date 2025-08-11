import type { BoardPosition } from "./intefaces/boardPosition";
import type { Player } from "./intefaces/player";
import { BurntSiennaCirclePositions } from "./Paths/BurntSiennaPath";
import { CambridgeBlueCirclePositions } from "./Paths/CambridgeBluePath";
import { PrussianBlueCirclePositions } from "./Paths/PrussianBluePath";
import { TanCirclePositions } from "./Paths/TanPath";

export const getStartPosition = (color: string): BoardPosition => {
  switch (color) {
    case "tan":
      return TanCirclePositions[0];
    case "burntSienna":
      return BurntSiennaCirclePositions[0];
    case "cambridgeBlue":
      return CambridgeBlueCirclePositions[0];
    case "prussianBlue":
      return PrussianBlueCirclePositions[0];
    default:
      return { x: 0, y: 350 };
  }
};

export const getPlayerName = (
  color: string,
  players: Player[]
): string | undefined => {
  const player = players.find((p: any) => p.color === color);
  return player && player.name;
};
