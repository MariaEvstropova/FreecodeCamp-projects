"use strict";
var Room = (function () {
    function Room(width, height, centerX, centerY, row, col) {
        this.width = width;
        this.height = height;
        this.centerX = centerX;
        this.centerY = centerY;
        this.row = row;
        this.col = col;
    }
    Room.prototype.draw = function (context) {
        context.fillRect(this.centerX - this.width / 2, this.centerY - this.height / 2, this.width, this.height);
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.js.map