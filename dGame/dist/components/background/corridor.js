"use strict";
class Corridor {
    constructor(room1, room2, position) {
        this.width = 35;
        let dX = room1.centerX - room2.centerX;
        let dY = room1.centerY - room2.centerY;
        this.startP = { x: room1.centerX, y: room1.centerY };
        switch (position) {
            case "hor":
                this.breakP1 = { x: room1.centerX - dX / 2, y: room1.centerY };
                this.breakP2 = { x: room1.centerX - dX / 2, y: room2.centerY };
                break;
            case "ver":
                this.breakP1 = { x: room1.centerX, y: room1.centerY - dY / 2 };
                this.breakP2 = { x: room2.centerX, y: room1.centerY - dY / 2 };
                break;
        }
        this.endP = { x: room2.centerX, y: room2.centerY };
        this.intervals = this.createIntervals(position);
        console.log(this.intervals);
    }
    draw(context) {
        context.lineWidth = this.width;
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
    createIntervals(position) {
        let intervals = [];
        switch (position) {
            case "hor":
                intervals[0] = {
                    xMin: this.startP.x,
                    xMax: this.breakP1.x,
                    yMin: this.startP.y - this.width / 2,
                    yMax: this.startP.y + this.width / 2
                };
                intervals[1] = {
                    xMin: this.breakP1.x - this.width / 2,
                    xMax: this.breakP1.x + this.width / 2,
                    yMin: this.breakP1.y,
                    yMax: this.breakP2.y
                };
                intervals[2] = {
                    xMin: this.breakP2.x,
                    xMax: this.endP.x,
                    yMin: this.breakP2.y - this.width / 2,
                    yMax: this.breakP2.y + this.width / 2
                };
                break;
            case "ver":
                intervals[0] = {
                    xMin: this.startP.x - this.width / 2,
                    xMax: this.startP.x + this.width / 2,
                    yMin: this.startP.y,
                    yMax: this.breakP1.y
                };
                intervals[1] = {
                    xMin: this.breakP1.x,
                    xMax: this.breakP2.x,
                    yMin: this.breakP1.y - this.width / 2,
                    yMax: this.breakP1.y + this.width / 2
                };
                intervals[2] = {
                    xMin: this.breakP2.x - this.width / 2,
                    xMax: this.breakP2.x + this.width / 2,
                    yMin: this.breakP2.y,
                    yMax: this.endP.y
                };
                break;
        }
        return intervals;
    }
    containPoint(point, width, height) {
        console.log(`poin x = ${point.x} y = ${point.y}`);
        let result = false;
        this.intervals.forEach((path, index, intervals) => {
            if (point.x > path.xMin
                &&
                    point.x < path.xMax
                &&
                    point.y > path.yMin
                &&
                    point.y < path.yMax) {
                result = true;
            }
        });
        return result;
    }
}
exports.Corridor = Corridor;
//# sourceMappingURL=corridor.js.map