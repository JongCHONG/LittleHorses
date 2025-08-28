import "./App.css";
import Board from "./components/Board";
import {
  TanCirclePositions,
  TanLastCirclePosition,
} from "./utils/path/tanPath";
import { TanEndZones } from "./utils/path/tanPath";
import {
  BurntSiennaCirclePositions,
  BurntSiennaLastCirclePosition,
} from "./utils/path/burntSiennaPath";
import { BurntSiennaEndZones } from "./utils/path/burntSiennaPath";
import {
  CambridgeBlueCirclePositions,
  CambridgeBlueLastCirclePosition,
} from "./utils/path/cambridgeBluePath";
import { CambridgeBlueEndZones } from "./utils/path/cambridgeBluePath";
import {
  PrussianBlueCirclePositions,
  PrussianBlueLastCirclePosition,
} from "./utils/path/prussianBluePath";
import { PrussianBlueEndZones } from "./utils/path/prussianBluePath";
import { GameLogProvider } from "./utils/contexts/GameLogContext";

function App() {
  return (
    <GameLogProvider>
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
    </GameLogProvider>
  );
}

export default App;
