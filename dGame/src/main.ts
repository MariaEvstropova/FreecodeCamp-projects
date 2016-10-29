import {Game} from "./components/game/game";

document.addEventListener("DOMContentLoaded", (event)=>{
  var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  var context:CanvasRenderingContext2D = canvas.getContext("2d");

  var game = new Game(context, canvas);
  game.drawGameLevel();
});
