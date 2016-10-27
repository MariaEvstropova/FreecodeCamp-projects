import {Background} from "./components/background/background";
import * as cells_data from "./components/game/cells_data";
declare function require(name: string): any;

let img = require("./images/spritesheet.png");

document.addEventListener("DOMContentLoaded", (event) => {
  let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  let context: CanvasRenderingContext2D = canvas.getContext("2d");
  let background = new Background(context, canvas.width, canvas.height);
  let spriteSheet = new Image();

  background.drawLevel();

  spriteSheet.onload = () => {

  };

  spriteSheet.src = img;
});
