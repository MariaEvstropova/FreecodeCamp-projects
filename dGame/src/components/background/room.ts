import {Point} from "../point";

export class Room {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  row: number;
  col: number;
  public constructor (width: number,
               height: number,
               centerX: number,
               centerY: number,
               row: number,
               col: number) {
    this.width = width;
    this.height = height;
    this.centerX = centerX;
    this.centerY = centerY;
    this.row = row;
    this.col = col;
  }
  public draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.centerX - this.width / 2,
                    this.centerY - this.height / 2,
                    this.width,
                    this.height);
  }
  public containPoint(point: Point, width: number, height: number): boolean {
    // console.log(`enter contain point for room: centerX = ${this.centerX}, centerY = ${this.centerY}`);
    if (
      (point.x - width/2) > (this.centerX - this.width/2)
      &&
      (point.x + width/2) < (this.centerX + this.width/2)
      &&
      (point.y - height/2) > (this.centerY - this.height/2)
      &&
      (point.y + height/2) < (this.centerY + this.height/2)
    ) {
      // console.log("return true");
      return true;
    }
    // console.log("return false");
    return false;
  }
}
