import {Room} from "./room";
import {Corridor} from "./corridor";
import {Point} from "../point";

declare function require(name: string): any;

interface Cell {
  row: number;
  col: number;
}

interface Walls {
  w: number;
  h: number;
}

export class Background {
  context: CanvasRenderingContext2D;
  rooms: Array<Room>;
  corridors: Array<Corridor>;
  countFail: number;
  width: number;
  height: number;
  cellW: number;
  cellH: number;
  field: Array<Cell>;
  imageBG: HTMLImageElement;
  imageR: HTMLImageElement;

  public constructor(context: CanvasRenderingContext2D, width: number, height: number) {
    this.context = context;
    this.rooms = [];
    this.corridors = [];
    this.countFail = 0;
    this.width = width;
    this.height = height;
    this.cellW = width / 3;
    this.cellH = height / 3;
    this.field = [];
  }

  getDelta(): Point {
    let dX = Math.floor(Math.random() * 2 * this.width / 10 - this.width / 10);
    let dY = Math.floor(Math.random() * 2 * this.height / 10 - this.height / 10);
    let result = {x: dX, y: dY};
    return result;
  }

  createWalls(): Walls {
    let width = Math.floor(Math.random() * (this.width / 5 - this.width / 10) + this.width / 10);
    let height = Math.floor(Math.random() * (this.height / 5 - this.height / 10) + this.height / 10);
    return {
      w: width,
      h: height
    };
  }

  getCellCenter(row: number, col: number): Point {
    let cX = this.cellW * (col - 1) + this.cellW / 2;
    let cY = this.cellH * (row - 1) + this.cellH / 2;
    return {
      x: cX,
      y: cY
    };
  }

  getRandomCell(): Cell {
    let row = Math.floor(Math.random() * 3 + 1);
    let col = Math.floor(Math.random() * 3 + 1);
    return {
      row: row,
      col: col
    };
  }

  isFree(cell: Cell): boolean {
    for (let i = 0; i < this.field.length; i++) {
      if (this.field[i].row === cell.row) {
        if (this.field[i].col === cell.col) {
          return false;
        }
      }
    }
    return true;
  }

  getRandNumRooms(): number {
    let numCells = Math.floor(Math.random() * 2 + 7);
    return numCells;
  }

  connectRooms(): void {
    for (let i = 1; i <= 3; i++) {
      let column = this.rooms.filter(item => {
        return item.col === i;
      });
      column.sort((a, b) => {
        return a.row - b.row;
      });
      column.reduce((previousValue, currentValue) => {
        this.corridors.push(new Corridor(previousValue, currentValue, "ver"));
        return currentValue;
      });

      let row = this.rooms.filter(item => {
        return item.row === i;
      });
      row.sort((a, b) => {
        return a.col - b.col;
      });
      row.reduce((previousValue, currentValue) => {
        this.corridors.push(new Corridor(previousValue, currentValue, "hor"));
        return currentValue;
      });
    }
  }

  public getLevel(): void {
    let numRooms = this.getRandNumRooms();
    while (this.rooms.length < numRooms) {
      let cell = this.getRandomCell();
      if (this.isFree(cell)) {
        let walls = this.createWalls();
        let delta = this.getDelta();
        let cellCenter = this.getCellCenter(cell.row, cell.col);
        let roomCenter = new Point();
        roomCenter.x = cellCenter.x + delta.x;
        roomCenter.y = cellCenter.y + delta.y;
        let room = new Room(walls.w, walls.h, roomCenter.x, roomCenter.y, cell.row, cell.col);
        this.rooms.push(room);
        this.field.push(cell);
      }
    }
    this.connectRooms();
  }

  redrawLevel(): Promise<any> {
    return new Promise((resolve, reject) => {
      let patternBG = this.context.createPattern(this.imageBG, "repeat");
      this.context.fillStyle = patternBG;
      this.context.fillRect(0, 0, this.width, this.height);
      let patternR = this.context.createPattern(this.imageR, "repeat");
      this.context.fillStyle = patternR;
      this.rooms.forEach((item, index) => {
        item.draw(this.context);
      });
      this.context.strokeStyle = patternR;
      this.corridors.forEach(item => item.draw(this.context));
      resolve();
    });
  }

  public drawLevel(): Promise<any> {
    let promiseBG = new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        this.imageBG = image;
        resolve();
      };
      image.src = require("../../images/water.png");
    });

    let promiseR = new Promise((resolve, reject) => {
      let image = new Image();
      image.onload = () => {
        this.imageR = image;
        resolve();
      };
      image.src = require("../../images/ground.png");
    });

    return Promise.all([promiseBG, promiseR]).then((resolve) => {
      this.getLevel();
      let patternBG = this.context.createPattern(this.imageBG, "repeat");
      this.context.fillStyle = patternBG;
      this.context.fillRect(0, 0, this.width, this.height);
      let patternR = this.context.createPattern(this.imageR, "repeat");
      this.context.fillStyle = patternR;
      this.rooms.forEach((item, index) => {
        item.draw(this.context);
      });
      this.context.strokeStyle = patternR;
      this.corridors.forEach(item => item.draw(this.context));
    });
  }
}
