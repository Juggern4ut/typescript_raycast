export default class Wall {
  start: { x: number; y: number };
  end: { x: number; y: number };

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.start = { x: x1, y: y1 };
    this.end = { x: x2, y: y2 };
  }

  /**
   * Will draw the wall to the given canvas
   * @param ctx The context to draw the wall onto
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }
}
