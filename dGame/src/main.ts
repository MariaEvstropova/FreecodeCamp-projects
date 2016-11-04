import {Game} from "./components/game/game";

document.addEventListener("DOMContentLoaded", (event)=>{
  let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  let context:CanvasRenderingContext2D = canvas.getContext("2d");
  let game:Game = new Game(context, canvas);

  function animate(now): void {
    game.cat.update(now);
    game.cat.draw(context);
    requestAnimationFrame(animate);
  }

  game.drawGameLevel().then((resolve) => {
    console.log(game.cat);
    requestAnimationFrame(animate);
  });
});
