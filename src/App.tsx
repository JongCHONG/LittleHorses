import "./App.css";
import Board from "./components/Board";
import { TanCirclePositions } from "./utils/TanPath";
import { TanEndZones } from "./utils/TanPath";
import { BurntSiennaCirclePositions } from "./utils/BurntSiennaPath";
import { BurntSiennaEndZones } from "./utils/BurntSiennaPath";
import { CambridgeBlueCirclePositions } from "./utils/CambridgeBluePath";
import { CambridgeBlueEndZones } from "./utils/CambridgeBluePath";
import { PrussianBlueCirclePositions } from "./utils/PrussianBluePath";
import { PrussianBlueEndZones } from "./utils/PrussianBluePath";

function App() {
  return (
    <>
      <Board
        tanCirclePositions={TanCirclePositions}
        tanEndZones={TanEndZones}
        burntSiennaCirclePositions={BurntSiennaCirclePositions}
        burntSiennaEndZones={BurntSiennaEndZones}
        cambridgeBlueCirclePositions={CambridgeBlueCirclePositions}
        cambridgeBlueEndZones={CambridgeBlueEndZones}
        prussianBlueCirclePositions={PrussianBlueCirclePositions}
        prussianBlueEndZones={PrussianBlueEndZones}
      />
    </>
  );
}

export default App;
