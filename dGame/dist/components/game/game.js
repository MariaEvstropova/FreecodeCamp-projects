"use strict";
const sprite_1 = require("../personages/sprite");
const artist_1 = require("../personages/artist");
const background_1 = require("../background/background");
const CELLS = require("./cells_data");
class Game {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.spriteSheet = new Image();
    }
    createPersonages(rooms) {
        let sprites = new Array();
        rooms.forEach((room, index) => {
            let dog = new sprite_1.Sprite("dog", new artist_1.Artist(this.spriteSheet, CELLS.dog_sleeps), room.centerX, room.centerY);
            sprites.push(dog);
        });
        return sprites;
    }
    drawGameLevel() {
        this.background = new background_1.Background(this.context, this.canvas.width, this.canvas.height);
        let promise = new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                this.spriteSheet = image;
                resolve();
            };
            image.src = require("../../images/spritesheet.png");
        });
        Promise.all([this.background.drawLevel(), promise]).then((resolve) => {
            this.personages = this.createPersonages(this.background.rooms);
            let cat = new sprite_1.Sprite("cat", new artist_1.Artist(this.spriteSheet, CELLS.catCells_front));
            this.personages.push(cat);
            this.personages.forEach((item, index, personages) => {
                item.draw(this.context);
            });
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map