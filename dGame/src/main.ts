import {Background} from "./components/background/background";
import * as cells_data from "./components/game/cells_data";
declare function require(name: string): any;

var img = require("./images/spritesheet.png");
export var img_w = require("./images/water.png");
export var img_g = require("./images/ground.png");

document.addEventListener("DOMContentLoaded", (event)=>{
  var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  var context:CanvasRenderingContext2D = canvas.getContext("2d");
  var background = new Background(context, canvas.width, canvas.height);
  var spriteSheet = new Image();

  background.drawLevel();

  spriteSheet.onload = () => {

  };

  spriteSheet.src = img;
});
