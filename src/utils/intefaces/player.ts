import type { BoardPosition } from "./boardPosition";
import type { Pawn } from "./pawn";

export interface Player {
  color?: "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue";
  pawns: Pawn[];
  name?: string;
  score?: number;
  canPlay?: boolean;
  actualPosition?: BoardPosition;
}
