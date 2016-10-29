"use strict";
var game_1 = require("./components/game/game");
document.addEventListener("DOMContentLoaded", function (event) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var game = new game_1.Game(context, canvas);
    game.drawGameLevel();
});
//# sourceMappingURL=main.js.map