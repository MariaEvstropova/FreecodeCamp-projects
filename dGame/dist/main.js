"use strict";
const game_1 = require("./components/game/game");
document.addEventListener("DOMContentLoaded", (event) => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let game = new game_1.Game(context, canvas);
    function animate(now) {
        game.cat.update(now);
        game.cat.draw(context);
        requestAnimationFrame(animate);
    }
    game.drawGameLevel().then((resolve) => {
        console.log(game.cat);
        requestAnimationFrame(animate);
    });
});
//# sourceMappingURL=main.js.map