"use strict";
const sprite_1 = require("../personages/sprite");
const artist_1 = require("../personages/artist");
const background_1 = require("../background/background");
const CELLS = require("./cells_data");
const catmove_1 = require("../personages/catmove");
class Game {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.spriteSheet = new Image();
    }
    createPersonages(rooms) {
        let sprites = new Array();
        let catCellIndex = Math.floor(Math.random() * (rooms.length - 1));
        rooms.forEach((room, index) => {
            let x = Math.random() * ((room.centerX + room.width / 2 - CELLS.DOG_CELLS_WIDTH) - (room.centerX - room.width / 2)) + (room.centerX - room.width / 2);
            let y = Math.random() * ((room.centerY + room.height / 2 - CELLS.DOG_CELLS_HEIGHT) - (room.centerY - room.height / 2)) + (room.centerY - room.height / 2);
            if (index === catCellIndex) {
                let catBehavior = new catmove_1.CatMoveBehavior(7);
                let cat = new sprite_1.Sprite("cat", new artist_1.Artist(this.spriteSheet, CELLS.catCells_front), x, y);
                cat.behaviors.push(catBehavior);
                this.cat = cat;
                sprites.push(cat);
            }
            else {
                let probability = Math.random();
                if (probability < 0.5) {
                    let dog = new sprite_1.Sprite("dog", new artist_1.Artist(this.spriteSheet, CELLS.dog_sleeps), x, y);
                    sprites.push(dog);
                }
                else {
                    let bone = new sprite_1.Sprite("bone", new artist_1.Artist(this.spriteSheet, CELLS.bone_flying), x, y);
                    sprites.push(bone);
                }
            }
        });
        return sprites;
    }
    drawGameLevel() {
        window.addEventListener("keydown", event => {
            if (event.keyCode == 87) {
                console.log("w");
            }
            if (event.keyCode == 65) {
                console.log("a");
            }
            if (event.keyCode == 68) {
                console.log("d");
            }
            if (event.keyCode == 83) {
                console.log("s");
            }
        });
        this.background = new background_1.Background(this.context, this.canvas.width, this.canvas.height);
        let promise = new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                this.spriteSheet = image;
                resolve();
            };
            image.src = require("../../images/spritesheet.png");
        });
        return Promise.all([this.background.drawLevel(), promise]).then((resolve) => {
            this.personages = this.createPersonages(this.background.rooms);
            this.personages.forEach((item, index, personages) => {
                item.draw(this.context);
            });
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map