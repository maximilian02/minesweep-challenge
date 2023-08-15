import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GameLoopComponent } from "./game-loop.component";

describe("GameLoopComponent", () => {
  let component: GameLoopComponent;
  let fixture: ComponentFixture<GameLoopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameLoopComponent],
    });
    fixture = TestBed.createComponent(GameLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render h1", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".board-title")?.textContent).toContain(
      "Minesweeper Board"
    );
  });

  it("should render the board", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".minesweeper-board")).toBeTruthy();
  });

  it("should render the reset button", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".reset")).toBeTruthy();
  });
});
