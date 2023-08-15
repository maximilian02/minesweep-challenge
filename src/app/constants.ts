export enum CellState {
  Hidden,
  Revealed,
  Flagged,
}

export interface Cell {
  hasMine: boolean;
  state: CellState;
  count: number; // Number of adjacent mines
}
