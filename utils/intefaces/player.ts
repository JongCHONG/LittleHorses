import type { Pawn } from "./pawn";

export interface Player {
  id: number;
  color?: "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue" | "none";
  pawns?: Pawn[];
  name?: string;
  score?: number;
  isReady?: boolean;
  pawnName?: string;
}
