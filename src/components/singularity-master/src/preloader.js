class Star {
  ctx = window.preloader.ctx;
  preloader = window.preloader;

  constructor(id, x, y) {
    this.x = x;
    this.y = y;
    this.r = Math.floor(Math.random() * 2) + 1;
    const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
    this.color = "rgba(255,255,255," + alpha + ")";
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  move(dt) {
    this.y -= dt * 15;
    if (this.y <= -10) this.y = this.preloader.ch + 10;
    this.draw();
  }
}

class Preloader {
  preloader = document.getElementById("preloader");
  ctx = this.preloader.getContext("2d");
  cw = 0;
  ch = 0;
  activePreloader = true;
  stars = [];

  constructor() {
    window.preloader = this;
    this.resize();
    for (let i = 0; i < 100; i++) {
      this.stars.push(
        new Star(i, Math.random() * this.cw, Math.random() * this.ch),
      );
    }
    window.addEventListener("resize", () => this.resize());
    this.last = performance.now();
    requestAnimationFrame((t) => this.animate(t));
  }

  animate(now) {
    if (!this.activePreloader) {
      requestAnimationFrame((t) => this.animate(t));
      return;
    }
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;

    this.ctx.fillStyle = "#050507";
    this.ctx.fillRect(0, 0, this.cw, this.ch);

    this.ctx.save();
    for (const s of this.stars) s.move(dt);
    this.ctx.restore();

    requestAnimationFrame((t) => this.animate(t));
  }

  resize() {
    this.preloader.width = window.innerWidth;
    this.preloader.height = window.innerHeight;
    this.cw = this.preloader.width;
    this.ch = this.preloader.height;
  }

  hidePreloader() {
    const start = performance.now();
    const fade = (now) => {
      const t = Math.min((now - start) / 400, 1);
      this.preloader.style.opacity = 1 - t;
      if (t < 1) requestAnimationFrame(fade);
      else {
        this.activePreloader = false;
        this.preloader.style.display = "none";
      }
    };
    requestAnimationFrame(fade);
  }

  showPlayButton(cb) {
    if (cb) cb();
  }
}

new Preloader();
