import {Background} from "./components/background";

document.addEventListener("DOMContentLoaded", (event)=>{
  var canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  var context:CanvasRenderingContext2D = canvas.getContext("2d");
  var background = new Background(context, canvas.width, canvas.height);

  background.drawLevel();
});
