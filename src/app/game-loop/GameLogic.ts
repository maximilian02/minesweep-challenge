import { Cell, CellState } from "../constants";

export class GameLogic {
  board: Cell[][];
  numRows: number;
  numCols: number;
  numMines: number;
  numFlags: number;
  gameOver: boolean;

  constructor(numRows: number, numCols: number, numMines: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.numMines = numMines;
    this.numFlags = numMines;
    this.gameOver = false;

    this.board = this.initializeBoard();
    this.placeMines();
    this.calculateAdjacentCounts();
  }

  initializeBoard(): Cell[][] {
    const board: Cell[][] = [];

    for (let i = 0; i < this.numRows; i++) {
      board[i] = [];
      for (let j = 0; j < this.numCols; j++) {
        board[i][j] = { hasMine: false, state: CellState.Hidden, count: 0 };
      }
    }

    return board;
  }

  placeMines(): void {
    const totalCells = this.numRows * this.numCols;
    const mineIndices = new Set<number>();

    while (mineIndices.size < this.numMines) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      mineIndices.add(randomIndex);
    }

    for (const index of mineIndices) {
      const row = Math.floor(index / this.numCols);
      const col = index % this.numCols;
      this.board[row][col].hasMine = true;
    }
  }

  calculateAdjacentCounts(): void {
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const cell = this.board[row][col];

        if (!cell.hasMine) {
          let count = 0;

          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < this.numRows && c >= 0 && c < this.numCols) {
                if (this.board[r][c].hasMine) {
                  count++;
                }
              }
            }
          }

          cell.count = count;
        }
      }
    }
  }

  revealCell(row: number, col: number): void {
    if (
      this.gameOver ||
      row < 0 ||
      row >= this.numRows ||
      col < 0 ||
      col >= this.numCols
    ) {
      return;
    }

    const cell: Cell = this.board[row][col];
    if (cell.state === CellState.Revealed || cell.state === CellState.Flagged) {
      return;
    }

    cell.state = CellState.Revealed;

    if (cell.hasMine) {
      this.gameOver = true;
      this.handleGameOver();
    } else if (cell.count === 0) {
      this.revealAdjacentCells(row, col);
    }

    if (!this.gameOver) {
      if (this.checkWinCondition()) {
        this.handleWin(); // Handle win logic
      }
    }
  }

  handleWin() {
    alert("Congrats! You just won.");
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const cell = this.board[row][col];
        cell.state = CellState.Revealed;
      }
    }
  }

  checkWinCondition(): boolean {
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const cell = this.board[row][col];

        if (cell.state === CellState.Revealed && cell.hasMine) {
          return false; // Player lost
        }

        if (cell.state !== CellState.Revealed && !cell.hasMine) {
          return false; // Player hasn't won yet
        }
      }
    }

    return true; // Player won
  }

  flagCell(row: number, col: number): void {
    if (
      this.gameOver ||
      row < 0 ||
      row >= this.numRows ||
      col < 0 ||
      col >= this.numCols
    ) {
      return;
    }

    const cell = this.board[row][col];
    if (cell.state === CellState.Revealed) {
      return;
    }

    if (cell.state === CellState.Flagged) {
      cell.state = CellState.Hidden;
      this.numFlags++;
    } else {
      if (this.numFlags > 0) {
        cell.state = CellState.Flagged;
        this.numFlags--;
      }
    }
  }

  revealAdjacentCells(row: number, col: number): void {
    if (row < 0 || row >= this.numRows || col < 0 || col >= this.numCols) {
      return;
    }

    const cell = this.board[row][col];
    if (cell.state === CellState.Revealed || cell.state === CellState.Flagged) {
      return;
    }

    cell.state = CellState.Revealed;

    if (cell.count === 0) {
      // Recursively reveal adjacent cells
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          this.revealAdjacentCells(r, c);
        }
      }
    }
  }

  handleGameOver(): void {
    for (let row = 0; row < this.numRows; row++) {
      for (let col = 0; col < this.numCols; col++) {
        const cell = this.board[row][col];
        if (cell.hasMine) {
          cell.state = CellState.Revealed;
        }
      }
    }

    alert("Game Over!");
  }

  resetGame(): void {
    this.board = this.initializeBoard();
    this.placeMines();
    this.calculateAdjacentCounts();
    this.gameOver = false;
    this.numFlags = this.numMines;
  }
}
