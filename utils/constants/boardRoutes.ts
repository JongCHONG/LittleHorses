import {
  BurntSiennaCirclePositions,
  BurntSiennaEndZones,
  BurntSiennaLastCirclePosition,
} from "../path/burntSiennaPath";
import {
  CambridgeBlueCirclePositions,
  CambridgeBlueEndZones,
  CambridgeBlueLastCirclePosition,
} from "../path/cambridgeBluePath";
import {
  PrussianBlueCirclePositions,
  PrussianBlueEndZones,
  PrussianBlueLastCirclePosition,
} from "../path/prussianBluePath";
import {
  TanCirclePositions,
  TanEndZones,
  TanLastCirclePosition,
} from "../path/tanPath";

export const TanRoute = TanCirclePositions.map((pos, i) => ({
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

export const BurntSiennaRoute = BurntSiennaCirclePositions.map((pos, i) => ({
  ...pos,
  id: i,
}))
  .concat({
    ...CambridgeBlueLastCirclePosition,
    id: BurntSiennaCirclePositions.length,
  })
  .concat(
    CambridgeBlueCirclePositions.map((pos, i) => ({
      ...pos,
      id: BurntSiennaCirclePositions.length + 1 + i,
    }))
  )
  .concat({
    ...PrussianBlueLastCirclePosition,
    id:
      BurntSiennaCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      1,
  })
  .concat(
    PrussianBlueCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        BurntSiennaCirclePositions.length +
        CambridgeBlueCirclePositions.length +
        2 +
        i,
    }))
  )
  .concat({
    ...TanLastCirclePosition,
    id:
      BurntSiennaCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      PrussianBlueCirclePositions.length +
      2,
  })
  .concat(
    TanCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        BurntSiennaCirclePositions.length +
        CambridgeBlueCirclePositions.length +
        PrussianBlueCirclePositions.length +
        3 +
        i,
    }))
  )
  .concat({
    ...BurntSiennaLastCirclePosition,
    id:
      TanCirclePositions.length +
      BurntSiennaCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      PrussianBlueCirclePositions.length +
      3,
  })
  .concat(
    BurntSiennaEndZones.map((pos, i) => ({
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

export const CambridgeBlueRoute = CambridgeBlueCirclePositions.map(
  (pos, i) => ({
    ...pos,
    id: i,
  })
)
  .concat({
    ...PrussianBlueLastCirclePosition,
    id: CambridgeBlueCirclePositions.length,
  })
  .concat(
    PrussianBlueCirclePositions.map((pos, i) => ({
      ...pos,
      id: CambridgeBlueCirclePositions.length + 1 + i,
    }))
  )
  .concat({
    ...TanLastCirclePosition,
    id:
      CambridgeBlueCirclePositions.length +
      PrussianBlueCirclePositions.length +
      1,
  })
  .concat(
    TanCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        CambridgeBlueCirclePositions.length +
        PrussianBlueCirclePositions.length +
        2 +
        i,
    }))
  )
  .concat({
    ...BurntSiennaLastCirclePosition,
    id:
      TanCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      PrussianBlueCirclePositions.length +
      2,
  })
  .concat(
    BurntSiennaCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        CambridgeBlueCirclePositions.length +
        PrussianBlueCirclePositions.length +
        3 +
        i,
    }))
  )
  .concat({
    ...CambridgeBlueLastCirclePosition,
    id:
      TanCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      PrussianBlueCirclePositions.length +
      3,
  })
  .concat(
    CambridgeBlueEndZones.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        CambridgeBlueCirclePositions.length +
        PrussianBlueCirclePositions.length +
        4 +
        i,
    }))
  );

export const PrussianBlueRoute = PrussianBlueCirclePositions.map((pos, i) => ({
  ...pos,
  id: i,
}))
  .concat({
    ...TanLastCirclePosition,
    id: PrussianBlueCirclePositions.length,
  })
  .concat(
    TanCirclePositions.map((pos, i) => ({
      ...pos,
      id: PrussianBlueCirclePositions.length + 1 + i,
    }))
  )
  .concat({
    ...BurntSiennaLastCirclePosition,
    id:
      TanCirclePositions.length +
      PrussianBlueCirclePositions.length +
      1,
  })
  .concat(
    BurntSiennaCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        PrussianBlueCirclePositions.length +
        2 +
        i,
    }))
  )
  .concat({
    ...CambridgeBlueLastCirclePosition,
    id:
      TanCirclePositions.length +
      PrussianBlueCirclePositions.length +
      2,
  })
  .concat(
    CambridgeBlueCirclePositions.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        PrussianBlueCirclePositions.length +
        3 +
        i,
    }))
  )
  .concat({
    ...PrussianBlueLastCirclePosition,
    id:
      TanCirclePositions.length +
      PrussianBlueCirclePositions.length +
      CambridgeBlueCirclePositions.length +
      3,
  })
  .concat(
    PrussianBlueEndZones.map((pos, i) => ({
      ...pos,
      id:
        TanCirclePositions.length +
        PrussianBlueCirclePositions.length +
        CambridgeBlueCirclePositions.length +
        4 +
        i,
    }))
  );