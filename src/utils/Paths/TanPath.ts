import type { BoardPosition } from "../intefaces/boardPosition";
import {
  BurntSiennaCirclePositions,
  BurntSiennaLastCirclePosition,
} from "./BurntSiennaPath";
import {
  CambridgeBlueCirclePositions,
  CambridgeBlueLastCirclePosition,
} from "./CambridgeBluePath";
import {
  PrussianBlueCirclePositions,
  PrussianBlueLastCirclePosition,
} from "./PrussianBluePath";

export const TanCirclePositions: BoardPosition[] = [
  { x: 0, y: 350 },
  { x: 50, y: 350 },
  { x: 100, y: 350 },
  { x: 150, y: 350 },
  { x: 200, y: 350 },
  { x: 250, y: 350 },
  { x: 300, y: 350 },
  { x: 350, y: 350 },
  { x: 350, y: 300 },
  { x: 350, y: 250 },
  { x: 350, y: 200 },
  { x: 350, y: 150 },
  { x: 350, y: 100 },
  { x: 350, y: 50 },
  { x: 350, y: 0 },
];

export const TanEndZones: BoardPosition[] = [
  { x: 50, y: 400 },
  { x: 100, y: 400 },
  { x: 150, y: 400 },
  { x: 200, y: 400 },
  { x: 250, y: 400 },
  { x: 300, y: 400 },
  { x: 350, y: 400 },
];

export const TanLastCirclePosition: BoardPosition = { x: 0, y: 400 };

export const TanPath = TanCirclePositions.map((pos, i) => ({
  ...pos,
  id: i,
}))
  .concat({ ...BurntSiennaLastCirclePosition, id: TanCirclePositions.length })
  .concat(
    BurntSiennaCirclePositions.map((pos, i) => ({
      ...pos,
      id: TanCirclePositions.length + 1 + i,
    }))
  )
  .concat({
    ...CambridgeBlueLastCirclePosition,
    id: TanCirclePositions.length + BurntSiennaCirclePositions.length + 1,
  })
  .concat(
    CambridgeBlueCirclePositions.map((pos, i) => ({
      ...pos,
      id: TanCirclePositions.length + BurntSiennaCirclePositions.length + 2 + i,
    }))
  )
  .concat({
    ...PrussianBlueLastCirclePosition,
    id:
      TanCirclePositions.length +
      BurntSiennaCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      2,
  })
  .concat(
    PrussianBlueCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        BurntSiennaCirclePositions.length +
        PrussianBlueCirclePositions.length +
        3 +
        i,
    }))
  )
  .concat({
    ...TanLastCirclePosition,
    id:
      TanCirclePositions.length +
      BurntSiennaCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      PrussianBlueCirclePositions.length +
      3,
  })
  .concat(
    TanEndZones.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        BurntSiennaCirclePositions.length +
        CambridgeBlueCirclePositions.length +
        PrussianBlueCirclePositions.length +
        4 +
        i,
    }))
  );
