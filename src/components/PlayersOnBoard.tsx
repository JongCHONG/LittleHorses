import { useSelector } from "react-redux";
import type { Player } from "../utils/intefaces/player";
import { v4 as uuidv4 } from "uuid";
import PawnPosition from "./PawnPosition";

const PlayersOnBoard = () => {
  const players = useSelector((state: { players: Player[] }) => state.players);
  const currentPawnIndex = useSelector(
    (state: { current: { currentPawnIndexByPlayer: number } }) =>
      state.current.currentPawnIndexByPlayer
  );

  return (
    <>
      {players?.map((player) => (
        <div key={uuidv4()}>
          <PawnPosition
            x={player.pawns?.[currentPawnIndex]?.position?.x ?? 0}
            y={player.pawns?.[currentPawnIndex]?.position?.y ?? 0}
            pawnName={player?.pawnName ?? null}
          />
        </div>
      ))}
    </>
  );
};

export default PlayersOnBoard;
