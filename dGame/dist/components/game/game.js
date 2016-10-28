"use strict";
var sprite_1 = require("../personages/sprite");
var artist_1 = require("../personages/artist");
var background_1 = require("../background/background");
var CELLS = require("./cells_data");
var Game = (function () {
    function Game(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.background = new background_1.Background(this.context, this.canvas.width, this.canvas.height);
        this.spriteSheet = require("../../images/spritesheet.png");
        var cat = new sprite_1.Sprite("cat", new artist_1.Artist(this.spriteSheet, CELLS.catCells_front));
        this.personages.push(cat);
    }
    Game.prototype.createLevel = function () {
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map