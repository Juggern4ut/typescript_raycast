import Particle from "./particle";
import Wall from "./wall";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const particle = new Particle(canvas.width / 2, canvas.height / 2);
const walls: Wall[] = [];

for (let i = 0; i < 5; i++) {
  walls.push(
    new Wall(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * canvas.width,
      Math.random() * canvas.height
    )
  );
}

walls.push(new Wall(0, 0, canvas.width, 0));
walls.push(new Wall(canvas.width, 0, canvas.width, canvas.height));
walls.push(new Wall(0, canvas.height, canvas.width, canvas.height));
walls.push(new Wall(0, 0, 0, canvas.height));

canvas.addEventListener("mousemove", (e) => {
  particle.setPosition(e.clientX, e.clientY);
});

function drawScene() {
  walls.forEach((wall) => {
    wall.draw(ctx);
  });

  particle.draw(ctx);

  particle.rays.forEach((r) => {
    let point = r.cast(walls);

    if (point) {
      point = point as { x: number; y: number };
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.beginPath();
      ctx.moveTo(particle.position.x, particle.position.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    r.draw(ctx);
  });
}

function clearScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(() => {
  clearScene();
  drawScene();
}, 20);
