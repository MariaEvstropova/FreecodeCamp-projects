import {Sprite} from "../personages/sprite";
import {Artist} from "../personages/artist";
import {Background} from "../background/background";
import * as CELLS from "./cells_data";
import {Point} from "../point";
import {Room} from "../background/room";
import {CatMoveBehavior} from "../personages/catmove";
import {DogBarkBehavior} from "../personages/dogbark";
import {RUN_ANIMATION} from "../../main";

declare function require(name: string): any;

export class Game {
  personages: Sprite[];
  cat: Sprite;
  catArt: Artist[];
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
        let catBehavior = new CatMoveBehavior();
        let cat = new Sprite("cat", new Artist(this.spriteSheet, CELLS.catCells_front), x, y);
        cat.behaviors.push(catBehavior);
        this.cat = cat;
        sprites.push(cat);
      } else {
        let probability = Math.random();
        if (probability < 0.5) {
          let dogBehavior = new DogBarkBehavior(RUN_ANIMATION);
          let dog = new Sprite("dog", new Artist(this.spriteSheet, CELLS.dog_sleeps), x, y);
          dog.behaviors.push(dogBehavior);
          sprites.push(dog);
        } else {
          let bone = new Sprite("bone", new Artist(this.spriteSheet, CELLS.bone_flying), x, y);
          sprites.push(bone);
        }
      }
    });
    return sprites;
  }

  checkWay(point: Point, width: number, height: number, background: Background): boolean {
    let spriteCenter = new Point();
    spriteCenter.x = point.x + width/2;
    spriteCenter.y = point.y + height/2;
    let result = false;
    // console.log(spriteCenter);

    background.rooms.forEach((room) => {
      if (room.containPoint(spriteCenter, width, height)) {
        // console.log(`room: centerX = ${room.centerX}, centerY = ${room.centerY}`);
        result = true;
      }
    });
    // console.log("checkWay return false");
    return result;
  }

  redrawLevelBG(bg: Background): void {
    this.background.redrawLevel().then((resolve) => {
      this.personages.forEach((item, index, personages) => {
        item.draw(this.context);
      });
    });
  }

  drawGameLevel(): Promise<any> {
    this.background = new Background(this.context, this.canvas.width, this.canvas.height);
    let promise = new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        this.spriteSheet = image;
        this.catArt = [
          new Artist(this.spriteSheet, CELLS.catCells_front),
          new Artist(this.spriteSheet, CELLS.catCells_left),
          new Artist(this.spriteSheet, CELLS.catCells_right),
          new Artist(this.spriteSheet, CELLS.catCells_back)
        ];
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
