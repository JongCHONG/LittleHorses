export interface Pawn {
  lastPosition: { x: number; y: number; id: number } | null;
  actualPosition: { x: number; y: number; id: number } | null;
  isFinished: boolean;
}
