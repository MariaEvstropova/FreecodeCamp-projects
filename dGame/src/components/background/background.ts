import {Room} from "./room";
import {Corridor} from "./corridor";
import {Point} from "./corridor";
import {img_w} from "../../main";
import {img_g} from "../../main";

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

  public constructor(context: CanvasRenderingContext2D, width:number, height: number){
    this.context = context;

    this.rooms = [];
    this.corridors = [];
    this.countFail = 0;
    this.width = width;
    this.height = height;
    this.cellW = width/3;
    this.cellH = height/3;
    this.field = [];
  }

  getDelta(): Point {
    let dX = Math.floor(Math.random()*2*this.width/10 - this.width/10);
    let dY = Math.floor(Math.random()*2*this.height/10 - this.height/10);
    var result = {x: dX, y: dY};
    return result;
  }

  createWalls():Walls {
    var width = Math.floor(Math.random()*(this.width/5 - this.width/10)+this.width/10);
    var height = Math.floor(Math.random()*(this.height/5 - this.height/10)+this.height/10);
    return {
      w: width,
      h: height
    }
  }

  getCellCenter(row:number, col:number):Point {
    let cX = this.cellW*(col-1) + this.cellW/2;
    let cY = this.cellH*(row-1) + this.cellH/2;
    return {
      x: cX,
      y: cY
    }
  }

  getRandomCell():Cell {
    let row = Math.floor(Math.random()*3+1);
    let col = Math.floor(Math.random()*3+1);
    return {
      row: row,
      col: col
    }
  }

  isFree(cell:Cell):boolean {
    for(let i=0; i<this.field.length; i++) {
      if (this.field[i].row == cell.row) {
        if (this.field[i].col == cell.col) {
          return false;
        }
      }
    }
    return true;
  }

  getRandNumRooms():number {
    var numCells = Math.floor(Math.random()*2+7);
    return numCells;
  }

  connectRooms():void {
    for (let i=1; i<=3; i++) {
      let column = this.rooms.filter(item => {
        return item.col == i;
      });
      column.sort((a,b) => {
        return a.row - b.row
      });
      column.reduce((previousValue, currentValue) => {
        this.corridors.push(new Corridor(previousValue, currentValue, "ver"));
        return currentValue;
      });

      let row = this.rooms.filter(item => {
        return item.row == i;
      });
      row.sort((a,b) => {
        return a.col - b.col
      });
      row.reduce((previousValue, currentValue) => {
        this.corridors.push(new Corridor(previousValue, currentValue, "hor"));
        return currentValue;
      });
    }
  }

  public getLevel():void {
    var numRooms = this.getRandNumRooms();
    while(this.rooms.length < numRooms) {
      var cell = this.getRandomCell();
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

  public drawLevel():void {
    var imageBG = new Image();
    imageBG.src = img_w;
    var imageR = new Image();
    imageR.src = img_g;
    imageBG.onload = () => {
      var patternBG = this.context.createPattern(imageBG, 'repeat');
      this.context.fillStyle = patternBG;
      this.context.fillRect(0,0,this.width,this.height);
      imageR.onload = () => {
        var patternR = this.context.createPattern(imageR, 'repeat');
        this.context.fillStyle = patternR;
        this.getLevel();
        this.rooms.forEach((item, index) => {
          item.draw(this.context);
        });
        this.context.strokeStyle = patternR;
        this.corridors.forEach(item => item.draw(this.context, this.width/25));
      };
    };
  }
}
