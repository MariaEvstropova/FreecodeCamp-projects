import {Sprite} from './sprite';

export interface Cell {
  left: number;
  top: number;
  width: number;
  height: number;
}

export class Artist {
  cells: Cell[];
  spritesheet: HTMLImageElement;
  cellIndex: number;

  constructor(spritesheet: HTMLImageElement, cells: Cell[]) {
    this.cells = cells;
    this.spritesheet = spritesheet;
    this.cellIndex = 0;
  }

  advance(): void {
    if (this.cellIndex == this.cells.length-1) {
      this.cellIndex = 0;
    }
    else {
      this.cellIndex++;
    }
  }

  draw(sprite: Sprite, context: CanvasRenderingContext2D): void {
    var cell = this.cells[this.cellIndex];
    context.drawImage(this.spritesheet,
                      cell.left,
                      cell.top,
                      cell.width,
                      cell.height,
                      sprite.left,
                      sprite.top,
                      cell.width,
                      cell.height);
  }
}
