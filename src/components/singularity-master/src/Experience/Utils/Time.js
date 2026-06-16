import EventEmitter from "./EventEmitter.js";
import { Timer } from "three";

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.timer = new Timer();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 0.016666666666666668;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    this.timer.update();
    this.delta = this.timer.getDelta();
    this.elapsed = this.timer.getElapsed();

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  reset() {
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
  }
}
