import { useSelector } from "react-redux";
import type { Player } from "../utils/intefaces/player";
import { v4 as uuidv4 } from "uuid";
import PawnPosition from "./PawnPosition";
import { getRoute } from "../utils/helpers";

const PlayersOnBoard = () => {
  const players = useSelector((state: { players: Player[] }) => state.players);
  const currentPawnIndex = useSelector(
    (state: { current: { currentPawnIndexByPlayer: number } }) =>
      state.current.currentPawnIndexByPlayer
  );

  return (
    <>
      {players?.map((player) =>
        player.color ? (
          <div key={uuidv4()}>
            <PawnPosition
              path={getRoute(player.color)}
              fromIndex={player.pawns?.[currentPawnIndex]?.lastPosition?.id ?? 0}
              toIndex={player.pawns?.[currentPawnIndex]?.actualPosition?.id ?? 0}
              pawnName={player?.pawnName ?? ""}
            />
          </div>
        ) : null
      )}
    </>
  );
};

export default PlayersOnBoard;
