import "./App.css";
import Board from "./components/Board";
import {
  TanCirclePositions,
  TanLastCirclePosition,
} from "./utils/Paths/TanPath";
import { TanEndZones } from "./utils/Paths/TanPath";
import {
  BurntSiennaCirclePositions,
  BurntSiennaLastCirclePosition,
} from "./utils/Paths/BurntSiennaPath";
import { BurntSiennaEndZones } from "./utils/Paths/BurntSiennaPath";
import {
  CambridgeBlueCirclePositions,
  CambridgeBlueLastCirclePosition,
} from "./utils/Paths/CambridgeBluePath";
import { CambridgeBlueEndZones } from "./utils/Paths/CambridgeBluePath";
import {
  PrussianBlueCirclePositions,
  PrussianBlueLastCirclePosition,
} from "./utils/Paths/PrussianBluePath";
import { PrussianBlueEndZones } from "./utils/Paths/PrussianBluePath";

function App() {
  return (
    <>
      <Board
        tanCirclePositions={[...TanCirclePositions, TanLastCirclePosition]}
        tanEndZones={TanEndZones}
        burntSiennaCirclePositions={[
          ...BurntSiennaCirclePositions,
          BurntSiennaLastCirclePosition,
        ]}
        burntSiennaEndZones={BurntSiennaEndZones}
        cambridgeBlueCirclePositions={[
          ...CambridgeBlueCirclePositions,
          CambridgeBlueLastCirclePosition,
        ]}
        cambridgeBlueEndZones={CambridgeBlueEndZones}
        prussianBlueCirclePositions={[
          ...PrussianBlueCirclePositions,
          PrussianBlueLastCirclePosition,
        ]}
        prussianBlueEndZones={PrussianBlueEndZones}
      />
    </>
  );
}

export default App;
