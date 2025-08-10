import "./App.css";
import Board from "./components/Board";

function App() {
  const tanCirclePositions = [
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
    // ... Ajoute toutes les positions nécessaires
  ];
  return (
    <>
      <Board tanCirclePositions={tanCirclePositions} />
    </>
  );
}

export default App;
