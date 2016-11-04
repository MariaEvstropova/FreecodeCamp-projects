"use strict";
const game_1 = require("./components/game/game");
let RUN_ANIMATION = 7;
document.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let game = new game_1.Game(context, canvas);
    function animate(now) {
        game.cat.update(now);
        game.redrawLevelBG(game.background);
        requestAnimationFrame(animate);
    }
    game.drawGameLevel().then((resolve) => {
        window.addEventListener("keydown", event => {
            if (event.keyCode == 87) {
                game.cat.artist = game.catArt[0];
                game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
            }
            if (event.keyCode == 65) {
                game.cat.artist = game.catArt[1];
                game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
            }
            if (event.keyCode == 68) {
                game.cat.artist = game.catArt[2];
                game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
            }
            if (event.keyCode == 83) {
                game.cat.artist = game.catArt[3];
                game.cat.behaviors[0].runAnimationRate = RUN_ANIMATION;
            }
        });
        window.addEventListener("keyup", event => {
            game.cat.behaviors[0].runAnimationRate = 0;
        });
        requestAnimationFrame(animate);
    });
});
//# sourceMappingURL=main.js.map