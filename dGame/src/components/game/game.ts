import {Sprite} from "../personages/sprite";
import {Artist} from "../personages/artist";
import {Background} from "../background/background";
import * as CELLS from "./cells_data";
import {Point} from "../point";
import {Room} from "../background/room";

declare function require(name: string): any;

export class Game {
  personages: Sprite[];
  background: Background;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  spriteSheet: HTMLImageElement;

  constructor(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.context = context;
    this.canvas = canvas;
    this.spriteSheet = new Image();
  }

  createPersonages(rooms: Array<Room>): Array<Sprite> {
    let sprites = new Array<Sprite>();
    rooms.forEach((room, index) => {
      let dog = new Sprite("dog", new Artist(this.spriteSheet, CELLS.dog_sleeps), room.centerX, room.centerY);
      sprites.push(dog);
    });
    return sprites;
  }

  drawGameLevel(): void {
    this.background = new Background(this.context, this.canvas.width, this.canvas.height);

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
      let cat = new Sprite("cat", new Artist(this.spriteSheet, CELLS.catCells_front));
      this.personages.push(cat);
      this.personages.forEach((item, index, personages) => {
        item.draw(this.context);
      });
    });
  }
}
