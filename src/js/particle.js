"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ray_1 = __importDefault(require("./ray"));
class Particle {
    constructor(x, y) {
        this.rays = [];
        this.position = { x, y };
        for (let i = 0; i < 360; i += 0.75) {
            this.rays.push(new ray_1.default(this.position.x, this.position.y, i + 0.01));
        }
    }
    setPosition(x, y) {
        this.position = { x, y };
        this.rays.forEach((r) => (r.position = { x, y }));
    }
    draw(ctx) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(this.position.x, this.position.y, 2, 2, Math.PI * 2, 0, Math.PI * 2);
        ctx.fill();
    }
}
exports.default = Particle;
