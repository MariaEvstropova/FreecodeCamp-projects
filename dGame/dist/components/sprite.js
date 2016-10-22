"use strict";
var Sprite = (function () {
    function Sprite(type, artist, behaviors) {
        this.type = type || '';
        this.artist = artist || undefined;
        this.behaviors = behaviors || [];
        this.left = 0;
        this.top = 0;
    }
    Sprite.prototype.draw = function (context) {
        this.artist.draw(this, context);
    };
    Sprite.prototype.update = function (time) {
        for (var i = 0; i < this.behaviors.length; ++i) {
            if (this.behaviors[i] === undefined) {
                return;
            }
            this.behaviors[i].execute(this, time);
        }
    };
    return Sprite;
}());
exports.Sprite = Sprite;
//# sourceMappingURL=sprite.js.map