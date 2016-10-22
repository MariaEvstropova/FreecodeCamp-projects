/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var background_1 = __webpack_require__(2);
	var img = __webpack_require__(5);
	var CAT_CELLS_WIDTH = 32, CAT_CELLS_HEIGHT = 32;
	var catCells_front = [
	    { left: 0, top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 32, top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 64, top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	];
	//Кот бежит налево
	var catCells_left = [
	    { left: 0, top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 32, top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 64, top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	];
	//Кот бежит направо
	var catCells_right = [
	    { left: 0, top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 32, top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 64, top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	];
	//Кот бежит назад
	var catCells_back = [
	    { left: 0, top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 32, top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	    { left: 64, top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
	];
	var DOG_CELLS_WIDTH = 32, DOG_CELLS_HEIGHT = 32;
	var dog_barks_right = [
	    { left: 0, top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	    { left: 42, top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	    { left: 76, top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	    { left: 118, top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	];
	var dog_barks_left = [
	    { left: 0, top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	    { left: 42, top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	    { left: 76, top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	    { left: 118, top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
	];
	var dog_sleeps = [
	    { left: 34, top: 140, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT }
	];
	var BONE_CELLS_WIDTH = 25, BONE_CELLS_HEIGHT = 25;
	var bone_flying = [
	    { left: 0, top: 134, width: BONE_CELLS_WIDTH, height: BONE_CELLS_HEIGHT }
	];
	document.addEventListener("DOMContentLoaded", function (event) {
	    var canvas_bg = document.getElementById("canvas");
	    var context_bg = canvas_bg.getContext("2d");
	    var background = new background_1.Background(context_bg, canvas_bg.width, canvas_bg.height);
	    var canvas_pl = document.getElementById("canvas-player");
	    var context_pl = canvas_pl.getContext("2d");
	    var spriteSheet = new Image();
	    spriteSheet.onload = function () {
	        context_pl.drawImage(spriteSheet, 0, 0);
	    };
	    spriteSheet.src = img;
	    // background.drawLevel();
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var room_1 = __webpack_require__(3);
	var corridor_1 = __webpack_require__(4);
	var corridor_2 = __webpack_require__(4);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Point = (function () {
	    function Point(x, y) {
	        this.x = x || 0;
	        this.y = y || 0;
	    }
	    return Point;
	}());
	exports.Point = Point;
	var Corridor = (function () {
	    function Corridor(room1, room2, position) {
	        var dX = room1.centerX - room2.centerX;
	        var dY = room1.centerY - room2.centerY;
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
	    }
	    Corridor.prototype.draw = function (context, lineWidth) {
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
	    };
	    return Corridor;
	}());
	exports.Corridor = Corridor;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "/images/spritesheet.png";

/***/ }
/******/ ]);