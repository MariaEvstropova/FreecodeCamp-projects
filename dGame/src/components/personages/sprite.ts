import {Artist} from './artist';
import {Behavior} from './behavior';
import {Point} from "../point";

export class Sprite {
  type: String;
  artist: Artist;
  behaviors: Behavior[];
  left: number;
  top: number;
  constructor(type?: String, artist?: Artist, x?: number, y?: number, behaviors?: Behavior[]) {
    this.type = type || '';
    this.artist = artist || undefined;
    this.behaviors = behaviors || [];

    this.left = x || 0;
    this.top = y || 0;
  }

  draw(context): void {
    this.artist.draw(this, context);
  }

  update(time): void {
    for (var i=0; i < this.behaviors.length; ++i) {
      if (this.behaviors[i] === undefined) { // Изменен во время цикла?
        return;
      }

      this.behaviors[i].execute(this, time);
    }
  }
}
