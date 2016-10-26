import {Artist} from "./artist";
import {Behavior} from "./behavior";

export class Sprite {
  type: String;
  artist: Artist;
  behaviors: Behavior[];
  left: number;
  top: number;
  constructor(type, artist, behaviors) {
    this.type = type || "";
    this.artist = artist || undefined;
    this.behaviors = behaviors || [];

    this.left = 0;
    this.top = 0;
  }

  draw(context): void {
    this.artist.draw(this, context);
  }

  update(time): void {
    for (let i = 0; i < this.behaviors.length; ++i) {
      if (this.behaviors[i] === undefined) { // Изменен во время цикла?
        return;
      }

      this.behaviors[i].execute(this, time);
    }
  }
}
