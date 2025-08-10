import "./App.css";
import Board from "./components/Board";
import { TanCirclePositions } from "./utils/TanPath";
import { BurntSiennaCirclePositions } from "./utils/BurntSiennaPath";
import { CambridgeBlueCirclePositions } from "./utils/CambridgeBluePath";
import { PrussianBlueCirclePositions } from "./utils/PrussianBluePath";

function App() {
  return (
    <>
      <Board
        tanCirclePositions={TanCirclePositions}
        burntSiennaCirclePositions={BurntSiennaCirclePositions}
        cambridgeBlueCirclePositions={CambridgeBlueCirclePositions}
        prussianBlueCirclePositions={PrussianBlueCirclePositions}
      />
    </>
  );
}

export default App;
