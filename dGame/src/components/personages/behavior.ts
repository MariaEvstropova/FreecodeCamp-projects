import {Sprite} from "./sprite";

export interface Behavior {
  runAnimationRate: number;
  lastAdvanceTime: number;

  execute(sprite: Sprite, time: number): void;
}
