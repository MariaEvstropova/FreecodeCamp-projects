"use strict";
class DogBarkBehavior {
    constructor(runAnimationRate) {
        this.runAnimationRate = runAnimationRate || 0;
        this.lastAdvanceTime = 0;
    }
    execute(dog, time) {
        if (this.runAnimationRate === 0)
            return;
        if (this.lastAdvanceTime === 0)
            this.lastAdvanceTime = time;
        else {
            if (time - this.lastAdvanceTime > 1000 / this.runAnimationRate) {
                dog.artist.advance();
                this.lastAdvanceTime = time;
            }
        }
    }
}
exports.DogBarkBehavior = DogBarkBehavior;
//# sourceMappingURL=dogbark.js.map