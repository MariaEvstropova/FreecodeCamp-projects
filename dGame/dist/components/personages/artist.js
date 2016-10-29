"use strict";
class Artist {
    constructor(spritesheet, cells) {
        this.cells = cells;
        this.spritesheet = spritesheet;
        this.cellIndex = 0;
    }
    advance() {
        if (this.cellIndex === this.cells.length - 1) {
            this.cellIndex = 0;
        }
        else {
            this.cellIndex++;
        }
    }
    draw(sprite, context) {
        let cell = this.cells[this.cellIndex];
        context.drawImage(this.spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, cell.width, cell.height);
    }
}
exports.Artist = Artist;
//# sourceMappingURL=artist.js.map