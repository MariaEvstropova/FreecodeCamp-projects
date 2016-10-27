"use strict";
var background_1 = require("../background/background");
var Game = (function () {
    function Game(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.background = new background_1.Background(this.context, this.canvas.width, this.canvas.height);
    }
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map