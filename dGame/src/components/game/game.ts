import {Sprite} from "../personages/sprite";
import {Artist} from "../personages/artist";
import {Background} from "../background/background";
import * as CELLS from "./cells_data";

declare function require(name: string): any;

export class Game {
  personages: Sprite[];
  background: Background;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  spriteSheet: HTMLImageElement;

  constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.context = context;
    this.canvas = canvas;
    this.background = new Background(this.context, this.canvas.width, this.canvas.height);
    this.spriteSheet = require("../../images/spritesheet.png");

    let cat = new Sprite("cat", new Artist(this.spriteSheet, CELLS.catCells_front));
    this.personages.push(cat);
  }

  createLevel(): void {
    
  }
}
