import Ray from "./ray";

export default class Particle {
  position: { x: number; y: number };
  rays: Ray[] = [];
  constructor(x: number, y: number) {
    this.position = { x, y };
    for (let i = 0; i < 360; i += 1) {
      this.rays.push(new Ray(this.position.x, this.position.y, i));
    }
  }

  setPosition(x: number, y: number) {
    this.position = { x, y };
    this.rays.forEach((r) => (r.position = { x, y }));
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(
      this.position.x,
      this.position.y,
      5,
      5,
      Math.PI * 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
