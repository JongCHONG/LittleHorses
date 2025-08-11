import type { Pawn } from "./pawn";

export interface Player {
  color?: "tan" | "burntSienna" | "cambridgeBlue" | "prussianBlue" | "none";
  pawns: Pawn[];
  name?: string;
  score?: number;
  canPlay?: boolean;
}
