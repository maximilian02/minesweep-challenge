import { Component, NgZone } from "@angular/core";
import { GameLogic } from "./GameLogic";
import { Cell } from "../constants";

@Component({
  selector: "app-game-loop",
  templateUrl: "./game-loop.component.html",
  styleUrls: ["./game-loop.component.scss"],
})
export class GameLoopComponent {
  game: GameLogic | null;
  board: Cell[][] | null;

  constructor() {
    this.game = new GameLogic(10, 10, 5);
    this.board = this.game.board;
  }

  revealCell(row: number, col: number) {
    this.game?.revealCell(row, col);
  }

  flagCell(row: number, col: number) {
    this.game?.flagCell(row, col);
  }

  resetGame() {
    this.game = new GameLogic(10, 10, 5);
    this.board = this.game.board;
  }
}
