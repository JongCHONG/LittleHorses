import { BurntSiennaRoute, CambridgeBlueRoute, PrussianBlueRoute, TanRoute } from "./BoardRoutes";
import type { BoardPosition } from "./intefaces/boardPosition";
import { BurntSiennaCirclePositions } from "./path/burntSiennaPath";
import { CambridgeBlueCirclePositions } from "./path/cambridgeBluePath";
import { PrussianBlueCirclePositions } from "./path/prussianBluePath";
import { TanCirclePositions } from "./path/tanPath";

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

export const getRoute = (color: string): BoardPosition[] => {
  switch (color) {
    case "tan":
      return TanRoute;
    case "burntSienna":
      return BurntSiennaRoute;
    case "cambridgeBlue":
      return CambridgeBlueRoute;
    case "prussianBlue":
      return PrussianBlueRoute;
    default:
      return [];
  }
};