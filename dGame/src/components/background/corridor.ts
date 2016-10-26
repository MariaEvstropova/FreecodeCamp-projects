import {Room} from "./room";

export class Point {
  x: number;
  y: number;
  public constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }
}

export class Corridor {
  startP: Point;
  breakP1: Point;
  breakP2: Point;
  endP: Point;
  public constructor(room1: Room, room2: Room, position: String) {
    let dX = room1.centerX - room2.centerX;
    let dY = room1.centerY - room2.centerY;
    this.startP = {x: room1.centerX, y: room1.centerY};
    switch (position) {
      case "hor":
        this.breakP1 = {x: room1.centerX - dX / 2, y: room1.centerY};
        this.breakP2 = {x: room1.centerX - dX / 2, y: room2.centerY};
        break;
      case "ver":
        this.breakP1 = {x: room1.centerX, y: room1.centerY - dY / 2};
        this.breakP2 = {x: room2.centerX, y: room1.centerY - dY / 2};
        break;
    }

    this.endP = {x: room2.centerX, y: room2.centerY};
  }

  public draw(context: CanvasRenderingContext2D, lineWidth: number) {
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(this.startP.x, this.startP.y);
    if ((typeof this.breakP1) !== "undefined") {
      context.lineTo(this.breakP1.x, this.breakP1.y);
      context.lineTo(this.breakP2.x, this.breakP2.y);
    }
    context.lineTo(this.endP.x, this.endP.y);
    context.stroke();
    context.closePath();
  }
}
