import { useSelector } from "react-redux";
import type { Player } from "../utils/intefaces/player";
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
              if (pawn.isFinished || !pawn.isOnBoard) return null;

              if (
                playerIdx === currentPlayerIndex &&
                pawnIdx !== currentPawnIndex
              ) {
                return null;
              }

              const isAnimated =
                playerIdx === currentPlayerIndex &&
                pawnIdx === currentPawnIndex;
              const fromIndex = isAnimated
                ? pawn.lastPosition?.id ?? pawn.actualPosition?.id ?? 0
                : pawn.actualPosition?.id ?? 0;
              const toIndex = pawn.actualPosition?.id ?? 0;
              return (
                <PawnPosition
                  key={player.id + "-" + pawnIdx}
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
