"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const particle_1 = __importDefault(require("./particle"));
const wall_1 = __importDefault(require("./wall"));
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const povCanvas = document.getElementById("firstPerson");
const povCtx = povCanvas.getContext("2d");
const particle = new particle_1.default(canvas.width / 2, canvas.height / 2);
const walls = [];
let distances = [];
for (let i = 0; i < 5; i++) {
    walls.push(new wall_1.default(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * canvas.width, Math.random() * canvas.height));
}
walls.push(new wall_1.default(0, 0, canvas.width, 0));
walls.push(new wall_1.default(canvas.width, 0, canvas.width, canvas.height));
walls.push(new wall_1.default(0, canvas.height, canvas.width, canvas.height));
walls.push(new wall_1.default(0, 0, 0, canvas.height));
canvas.addEventListener("mousemove", (e) => {
    particle.setPosition(e.clientX, e.clientY);
});
function drawScene() {
    walls.forEach((wall) => {
        wall.draw(ctx);
    });
    particle.draw(ctx);
    distances = [];
    particle.rays.forEach((r) => {
        let point = r.cast(walls);
        if (point) {
            point = point;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
            ctx.beginPath();
            ctx.moveTo(particle.position.x, particle.position.y);
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            distances.push(r.getDist(point.x, point.y));
        }
        r.draw(ctx);
    });
}
function drawPovScene() {
    const segments = povCanvas.width / distances.length;
    for (let i = 0; i < distances.length; i++) {
        const factor = distances[i] / 300;
        const height = povCanvas.height * (1 - factor);
        const col = 255 - (factor * 255);
        povCtx.fillStyle = `rgb(${col}, ${col}, ${col})`;
        povCtx.fillRect(i * segments, (povCanvas.height - height) / 2, povCanvas.width / distances.length + 2, height);
    }
}
function clearScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    povCtx.clearRect(0, 0, povCanvas.width, povCanvas.height);
}
document.addEventListener("keydown", e => {
    if (e.key == 'a') {
        particle.rotate(-1.5);
    }
    else if (e.key == "d") {
        particle.rotate(1.5);
    }
});
setInterval(() => {
    clearScene();
    drawScene();
    drawPovScene();
}, 20);
