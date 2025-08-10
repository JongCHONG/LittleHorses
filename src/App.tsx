import "./App.css";
import Board from "./components/Board";
import { TanCirclePositions } from "./utils/Paths/TanPath";
import { TanEndZones } from "./utils/Paths/TanPath";
import { BurntSiennaCirclePositions } from "./utils/Paths/BurntSiennaPath";
import { BurntSiennaEndZones } from "./utils/Paths/BurntSiennaPath";
import { CambridgeBlueCirclePositions } from "./utils/Paths/CambridgeBluePath";
import { CambridgeBlueEndZones } from "./utils/Paths/CambridgeBluePath";
import { PrussianBlueCirclePositions } from "./utils/Paths/PrussianBluePath";
import { PrussianBlueEndZones } from "./utils/Paths/PrussianBluePath";

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
