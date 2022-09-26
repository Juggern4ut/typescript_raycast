import Ray from "./ray";

export default class Particle {
  rot = 0;
  position: { x: number; y: number };
  rays: Ray[] = [];
  constructor(x: number, y: number) {
    this.position = { x, y };
    for (let i = -30; i < 30; i += 1) {
      this.rays.push(new Ray(this.position.x, this.position.y, i + 0.01));
    }
  }

  setPosition(x: number, y: number) {
    this.position = { x, y };
    this.rays.forEach((r) => (r.position = { x, y }));
  }

  rotate(amnt: number) {
    this.rays = [];
    this.rot += amnt;
    for (let i = -30 + this.rot; i < 30 + this.rot; i += 1) {
      this.rays.push(new Ray(this.position.x, this.position.y, i + 0.01));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(
      this.position.x,
      this.position.y,
      2,
      2,
      Math.PI * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
