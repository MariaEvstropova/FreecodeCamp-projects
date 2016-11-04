import {Sprite} from "../personages/sprite";
import {Artist} from "../personages/artist";
import {Background} from "../background/background";
import * as CELLS from "./cells_data";
import {Point} from "../point";
import {Room} from "../background/room";
import {CatMoveBehavior} from "../personages/catmove";

declare function require(name: string): any;

export class Game {
  personages: Sprite[];
  cat: Sprite;
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
    let catCellIndex = Math.floor(Math.random()*(rooms.length - 1));
    rooms.forEach((room, index) => {
      let x = Math.random()*((room.centerX + room.width/2 - CELLS.DOG_CELLS_WIDTH) - (room.centerX - room.width/2)) + (room.centerX - room.width/2);
      let y = Math.random()*((room.centerY + room.height/2 - CELLS.DOG_CELLS_HEIGHT) - (room.centerY - room.height/2)) + (room.centerY - room.height/2);
      if (index === catCellIndex) {
        let catBehavior = new CatMoveBehavior(7);
        let cat = new Sprite("cat", new Artist(this.spriteSheet, CELLS.catCells_front), x, y);
        cat.behaviors.push(catBehavior);
        this.cat = cat;
        sprites.push(cat);
      } else {
        let probability = Math.random();
        if (probability < 0.5) {
          let dog = new Sprite("dog", new Artist(this.spriteSheet, CELLS.dog_sleeps), x, y);
          sprites.push(dog);
        } else {
          let bone = new Sprite("bone", new Artist(this.spriteSheet, CELLS.bone_flying), x, y);
          sprites.push(bone);
        }
      }
    });
    return sprites;
  }

  drawGameLevel(): Promise<any> {
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

    this.background = new Background(this.context, this.canvas.width, this.canvas.height);

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
