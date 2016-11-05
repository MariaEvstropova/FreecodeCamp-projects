"use strict";
const game_1 = require("./components/game/game");
exports.RUN_ANIMATION = 7;
let RUN_VELOCITY = 50;
document.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let game = new game_1.Game(context, canvas);
    let fps, lastTimeAnimate = 0;
    function animate(now) {
        fps = calculateFPS(now);
        game.cat.update(now);
        game.personages.forEach((item) => {
            item.update(now);
        });
        game.redrawLevelBG(game.background);
        requestAnimationFrame(animate);
    }
    function calculateFPS(now) {
        let fps = 1000 / (now - lastTimeAnimate);
        lastTimeAnimate = now;
        return fps;
    }
    game.drawGameLevel().then((resolve) => {
        window.addEventListener("keydown", event => {
            if (event.keyCode == 87) {
                game.cat.artist = game.catArt[0];
                game.cat.behaviors[0].runAnimationRate = exports.RUN_ANIMATION;
                let point = {
                    x: game.cat.left,
                    y: game.cat.top + RUN_VELOCITY / fps
                };
                let width = game.catArt[0].cells[0].width;
                let height = game.catArt[0].cells[0].height;
                if (game.checkWay(point, width, height, game.background)) {
                    game.cat.top += RUN_VELOCITY / fps;
                }
            }
            if (event.keyCode == 65) {
                game.cat.artist = game.catArt[1];
                game.cat.behaviors[0].runAnimationRate = exports.RUN_ANIMATION;
                let point = {
                    x: game.cat.left - RUN_VELOCITY / fps,
                    y: game.cat.top
                };
                let width = game.catArt[1].cells[0].width;
                let height = game.catArt[1].cells[0].height;
                if (game.checkWay(point, width, height, game.background)) {
                    game.cat.left -= RUN_VELOCITY / fps;
                }
            }
            if (event.keyCode == 68) {
                game.cat.artist = game.catArt[2];
                game.cat.behaviors[0].runAnimationRate = exports.RUN_ANIMATION;
                let point = {
                    x: game.cat.left + RUN_VELOCITY / fps,
                    y: game.cat.top
                };
                let width = game.catArt[2].cells[0].width;
                let height = game.catArt[2].cells[0].height;
                if (game.checkWay(point, width, height, game.background)) {
                    game.cat.left += RUN_VELOCITY / fps;
                }
            }
            if (event.keyCode == 83) {
                game.cat.artist = game.catArt[3];
                game.cat.behaviors[0].runAnimationRate = exports.RUN_ANIMATION;
                let point = {
                    x: game.cat.left,
                    y: game.cat.top - RUN_VELOCITY / fps
                };
                let width = game.catArt[3].cells[0].width;
                let height = game.catArt[3].cells[0].height;
                if (game.checkWay(point, width, height, game.background)) {
                    game.cat.top -= RUN_VELOCITY / fps;
                }
            }
        });
        window.addEventListener("keyup", event => {
            game.cat.behaviors[0].runAnimationRate = 0;
        });
        requestAnimationFrame(animate);
    });
});
//# sourceMappingURL=main.js.map