"use strict";
var room_1 = require("./room");
var corridor_1 = require("./corridor");
var corridor_2 = require("./corridor");
var Background = (function () {
    function Background(context, width, height) {
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
    Background.prototype.getDelta = function () {
        var dX = Math.floor(Math.random() * 2 * this.width / 10 - this.width / 10);
        var dY = Math.floor(Math.random() * 2 * this.height / 10 - this.height / 10);
        var result = { x: dX, y: dY };
        return result;
    };
    Background.prototype.createWalls = function () {
        var width = Math.floor(Math.random() * (this.width / 5 - this.width / 10) + this.width / 10);
        var height = Math.floor(Math.random() * (this.height / 5 - this.height / 10) + this.height / 10);
        return {
            w: width,
            h: height
        };
    };
    Background.prototype.getCellCenter = function (row, col) {
        var cX = this.cellW * (col - 1) + this.cellW / 2;
        var cY = this.cellH * (row - 1) + this.cellH / 2;
        return {
            x: cX,
            y: cY
        };
    };
    Background.prototype.getRandomCell = function () {
        var row = Math.floor(Math.random() * 3 + 1);
        var col = Math.floor(Math.random() * 3 + 1);
        return {
            row: row,
            col: col
        };
    };
    Background.prototype.isFree = function (cell) {
        for (var i = 0; i < this.field.length; i++) {
            if (this.field[i].row == cell.row) {
                if (this.field[i].col == cell.col) {
                    return false;
                }
            }
        }
        return true;
    };
    Background.prototype.getRandNumRooms = function () {
        var numCells = Math.floor(Math.random() * 2 + 7);
        return numCells;
    };
    Background.prototype.connectRooms = function () {
        var _this = this;
        var _loop_1 = function(i) {
            var column = this_1.rooms.filter(function (item) {
                return item.col == i;
            });
            column.sort(function (a, b) {
                return a.row - b.row;
            });
            column.reduce(function (previousValue, currentValue) {
                _this.corridors.push(new corridor_1.Corridor(previousValue, currentValue, "ver"));
                return currentValue;
            });
            var row = this_1.rooms.filter(function (item) {
                return item.row == i;
            });
            row.sort(function (a, b) {
                return a.col - b.col;
            });
            row.reduce(function (previousValue, currentValue) {
                _this.corridors.push(new corridor_1.Corridor(previousValue, currentValue, "hor"));
                return currentValue;
            });
        };
        var this_1 = this;
        for (var i = 1; i <= 3; i++) {
            _loop_1(i);
        }
    };
    Background.prototype.getLevel = function () {
        var numRooms = this.getRandNumRooms();
        while (this.rooms.length < numRooms) {
            var cell = this.getRandomCell();
            if (this.isFree(cell)) {
                var walls = this.createWalls();
                var delta = this.getDelta();
                var cellCenter = this.getCellCenter(cell.row, cell.col);
                var roomCenter = new corridor_2.Point();
                roomCenter.x = cellCenter.x + delta.x;
                roomCenter.y = cellCenter.y + delta.y;
                var room = new room_1.Room(walls.w, walls.h, roomCenter.x, roomCenter.y, cell.row, cell.col);
                this.rooms.push(room);
                this.field.push(cell);
            }
        }
        this.connectRooms();
    };
    Background.prototype.drawLevel = function () {
        var _this = this;
        var imageBG = new Image();
        imageBG.src = "http://res.cloudinary.com/mariaevstropova/image/upload/v1476004934/grass_pjschm.png";
        var imageR = new Image();
        imageR.src = "http://res.cloudinary.com/mariaevstropova/image/upload/v1476004934/road_caf7b3.png";
        imageBG.onload = function () {
            var patternBG = _this.context.createPattern(imageBG, 'repeat');
            _this.context.fillStyle = patternBG;
            _this.context.fillRect(0, 0, _this.width, _this.height);
            imageR.onload = function () {
                console.log("image R onload");
                var patternR = _this.context.createPattern(imageR, 'repeat');
                _this.context.fillStyle = patternR;
                _this.getLevel();
                _this.rooms.forEach(function (item, index) {
                    item.draw(_this.context);
                });
                _this.context.strokeStyle = patternR;
                _this.corridors.forEach(function (item) { return item.draw(_this.context, _this.width / 25); });
            };
        };
    };
    return Background;
}());
exports.Background = Background;
//# sourceMappingURL=background.js.map