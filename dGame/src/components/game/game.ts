import {Sprite} from "../personages/sprite";
import {Background} from "../background/background";

export class Game {
  personages: Sprite[];
  background: Background;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.context = context;
    this.canvas = canvas;
    this.background = new Background(this.context, this.canvas.width, this.canvas.height);
  }
}
