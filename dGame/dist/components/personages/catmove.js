"use strict";
class CatMoveBehavior {
    constructor(runAnimationRate) {
        this.runAnimationRate = runAnimationRate || 0;
        this.lastAdvanceTime = 0;
    }
    execute(sprite, time) {
        if (this.runAnimationRate === 0)
            return;
        if (this.lastAdvanceTime === 0)
            this.lastAdvanceTime = time;
        else {
            if (time - this.lastAdvanceTime > 1000 / this.runAnimationRate) {
                sprite.artist.advance();
                this.lastAdvanceTime = time;
            }
        }
    }
}
exports.CatMoveBehavior = CatMoveBehavior;
//# sourceMappingURL=catmove.js.map