import Wall from "./wall";

export default class Ray {
  position: { x: number; y: number };
  angle: number;
  constructor(posX: number, posY: number, angle: number) {
    this.position = { x: posX, y: posY };
    this.angle = angle;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);  

    ctx.lineTo(
      this.position.x + Math.cos(this.angle * (Math.PI / 180)),
      this.position.y + Math.sin(this.angle * (Math.PI / 180))
    );

    ctx.stroke();
  }

  cast(walls: Wall[]): { x: number; y: number } | boolean {
    let currentClosest : boolean | {x:number,y:number} = false;

    for (let w of walls) {
      const x1 = w.start.x;
      const y1 = w.start.y;
      const x2 = w.end.x;
      const y2 = w.end.y;

      const x3 = this.position.x;
      const y3 = this.position.y;
      const x4 = this.position.x + Math.cos(this.angle * (Math.PI / 180));
      const y4 = this.position.y + Math.sin(this.angle * (Math.PI / 180));

      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
      if (den == 0) return false;

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / den;

      //console.log(t, u);
      
      if (t > 0 && t < 1 && u > 0) {
        let retX = x1 + t * (x2 - x1);
        let retY = y1 + t * (y2 - y1);

        if(currentClosest == false || this.getDist(retX, retY) < this.getDist(currentClosest.x, currentClosest.y)){
            currentClosest = { x: retX, y: retY }            
        }
      }
    }

    return currentClosest;
  }

  getDist(x: number, y: number): number {
    const dX = Math.abs(x - this.position.x);
    const dY = Math.abs(y - this.position.y);
    return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
  }
}
