"use strict";
class Sprite {
    constructor(type, artist, x, y, behaviors) {
        this.type = type || '';
        this.artist = artist || undefined;
        this.behaviors = behaviors || [];
        this.left = x || 0;
        this.top = y || 0;
    }
    draw(context) {
        this.artist.draw(this, context);
    }
    update(time) {
        for (var i = 0; i < this.behaviors.length; ++i) {
            if (this.behaviors[i] === undefined) {
                return;
            }
            this.behaviors[i].execute(this, time);
        }
    }
}
exports.Sprite = Sprite;
//# sourceMappingURL=sprite.js.map