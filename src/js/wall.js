"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Wall {
    constructor(x1, y1, x2, y2) {
        this.start = { x: x1, y: y1 };
        this.end = { x: x2, y: y2 };
    }
    /**
     * Will draw the wall to the given canvas
     * @param ctx The context to draw the wall onto
     */
    draw(ctx) {
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.stroke();
    }
}
exports.default = Wall;
