"use strict";
class Room {
    constructor(width, height, centerX, centerY, row, col) {
        this.width = width;
        this.height = height;
        this.centerX = centerX;
        this.centerY = centerY;
        this.row = row;
        this.col = col;
    }
    draw(context) {
        context.fillRect(this.centerX - this.width / 2, this.centerY - this.height / 2, this.width, this.height);
    }
    containPoint(point, width, height) {
        if ((point.x - width / 2) > (this.centerX - this.width / 2)
            &&
                (point.x + width / 2) < (this.centerX + this.width / 2)
            &&
                (point.y - height / 2) > (this.centerY - this.height / 2)
            &&
                (point.y + height / 2) < (this.centerY + this.height / 2)) {
            return true;
        }
        return false;
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map