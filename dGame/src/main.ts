import {Game} from "./components/game/game";
import {Artist} from "./components/personages/artist";
import * as CELLS from "./components/game/cells_data";
let RUN_ANIMATION = 7;

document.addEventListener("DOMContentLoaded", (event)=>{
  let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
  let context:CanvasRenderingContext2D = canvas.getContext("2d");
  let game:Game = new Game(context, canvas);

  function animate(now): void {
    game.cat.update(now);
    game.redrawLevelBG(game.background);
    requestAnimationFrame(animate);
  }

  game.drawGameLevel().then((resolve) => {
    window.addEventListener("keydown", event => {
      if (event.keyCode == 87) {
        game.cat.artist = game.catArt[0];
        game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
        // console.log("w");
      }
      if (event.keyCode == 65) {
        game.cat.artist = game.catArt[1];
        game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
        // console.log("a");
      }
      if (event.keyCode == 68) {
        game.cat.artist = game.catArt[2];
        game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
        // console.log("d");
      }
      if (event.keyCode == 83) {
        game.cat.artist = game.catArt[3];
        game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
        // console.log("s");
      }
    });

    window.addEventListener("keyup", event => {
      game.cat.behaviors[0].runAnimationRate = 0;
    });

    requestAnimationFrame(animate);
  });
});
