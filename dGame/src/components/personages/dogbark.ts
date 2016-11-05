import {Behavior} from "./behavior";
import {Sprite} from "./sprite";

export class DogBarkBehavior implements Behavior {
  runAnimationRate: number;
  lastAdvanceTime: number;

  constructor(runAnimationRate?: number) {
    this.runAnimationRate = runAnimationRate || 0;
    this.lastAdvanceTime = 0;
  }

  execute(dog: Sprite, time: number): void {
    if (this.runAnimationRate === 0) return;
    if (this.lastAdvanceTime === 0) this.lastAdvanceTime = time;
    else {
      if(time - this.lastAdvanceTime > 1000/this.runAnimationRate) {
        dog.artist.advance();
        this.lastAdvanceTime = time;
      }
    }
  }
}
