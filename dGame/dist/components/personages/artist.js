"use strict";
var Artist = (function () {
    function Artist(spritesheet, cells) {
        this.cells = cells;
        this.spritesheet = spritesheet;
        this.cellIndex = 0;
    }
    Artist.prototype.advance = function () {
        if (this.cellIndex === this.cells.length - 1) {
            this.cellIndex = 0;
        }
        else {
            this.cellIndex++;
        }
    };
    Artist.prototype.draw = function (sprite, context) {
        var cell = this.cells[this.cellIndex];
        context.drawImage(this.spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, cell.width, cell.height);
    };
    return Artist;
}());
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map