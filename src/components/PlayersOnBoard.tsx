import { useSelector } from "react-redux";
import type { Player } from "../utils/intefaces/player";
import { v4 as uuidv4 } from "uuid";
import PawnPosition from "./PawnPosition";
import { getRoute } from "../utils/helpers";

const PlayersOnBoard = () => {
  const players = useSelector((state: { players: Player[] }) => state.players);
  const currentPlayerIndex = useSelector(
    (state: { current: { currentPlayerIndex: number } }) =>
      state.current.currentPlayerIndex
  );
  const currentPawnIndex = useSelector(
    (state: { current: { currentPawnIndexByPlayer: number } }) =>
      state.current.currentPawnIndexByPlayer
  );

  return (
    <>
      {players?.map((player, playerIdx) =>
        player.color
          ? player.pawns?.map((pawn, pawnIdx) => {
              // Seul le pion courant du joueur courant est animé
              const isAnimated =
                playerIdx === currentPlayerIndex && pawnIdx === currentPawnIndex;
              const fromIndex = isAnimated
                ? pawn.lastPosition?.id ?? pawn.actualPosition?.id ?? 0
                : pawn.actualPosition?.id ?? 0;
              const toIndex = pawn.actualPosition?.id ?? 0;
              return (
                <PawnPosition
                  key={uuidv4()}
                  path={getRoute(player.color!)}
                  fromIndex={fromIndex}
                  toIndex={toIndex}
                  pawnName={player?.pawnName ?? ""}
                />
              );
            })
          : null
      )}
    </>
  );
};

export default PlayersOnBoard;
