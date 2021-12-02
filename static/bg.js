import { randFloat, randInt, randItem } from "./rand.js";

class CanvasManager {
  /**
   * Manages a <canvas> element size and draw callbacks.
   */
  constructor({ density, createFn }) {
    this.canvas;
    this.ctx;
    this.objects = [];
    this.size = [0, 0];
    this.density = density;
    this.createFn = createFn;
    addEventListener("resize", this.setDimensions);
  }

  /**
   * Creates a new canvas element then injects it into the DOM.
   */
  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.zIndex = "-1";
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    document.body.appendChild(this.canvas);
  }

  /**
   * Updates the dimensions of the viewport.
   */
  setDimensions = () => {
    this.size = [window.innerWidth, window.innerHeight];
    this.canvas.width = this.size[0];
    this.canvas.height = this.size[1];
  };

  /**
   * Loop for draw callbacks.
   */
  draw = () => {
    const desiredCount = Math.floor(this.size[0] * this.size[1] * this.density);
    const addCount = desiredCount - this.objects.length;
    for (let i = 0; i < addCount; i++) {
      this.objects.push(this.createFn(this.size));
    }

    const removeCount = this.objects.length - desiredCount;
    for (let i = 0; i < removeCount; i++) {
      this.objects.pop();
    }

    this.ctx.clearRect(0, 0, this.size[0], this.size[1]);
    for (const object of this.objects) {
      object.draw(this.ctx, this.size, this.objects);
    }

    requestAnimationFrame(this.draw);
  };
}

class AminationObject {
  /**
   * Controls an object to be animated,
   */
  constructor({ position, vector, radius, color, speed, vision, lineWidth }) {
    this.position = position;
    this.vector = vector;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.vision = vision;
    this.lineWidth = lineWidth;
    this.lastDrawn = Date.now();
  }

  /**
   * Draws our object to the canvas.
   */
  draw(ctx, size, others) {
    const delay = Date.now() - this.lastDrawn;
    const movement = this.speed * delay;

    for (let i = 0; i <= 1; i++) {
      this.position[i] += this.vector[i] * movement;
      if (this.position[i] <= -this.radius) {
        this.position[i] = size[i] + this.radius;
      } else if (this.position[i] >= size[i] + this.radius) {
        this.position[i] = -this.radius;
      }
    }

    ctx.beginPath();
    ctx.arc(this.position[0], this.position[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    for (const other of others) {
      if (other === this) {
        continue;
      }
      const dX = other.position[0] - this.position[0];
      const dY = other.position[1] - this.position[1];
      const d = Math.sqrt(dX ** 2 + dY ** 2);
      const dMin = this.radius + other.radius;
      const dMax = dMin + this.vision;
      if (d >= dMin && d <= dMax) {
        const dP = 1 - (d - dMin) / (dMax - dMin);
        const s1 = this.radius / d;
        const s2 = 1 - other.radius / d;
        const x3 = s1 * dX + this.position[0];
        const y3 = s1 * dY + this.position[1];
        const x4 = s2 * dX + this.position[0];
        const y4 = s2 * dY + this.position[1];
        ctx.beginPath();
        ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.strokeStyle = this.color;
        ctx.lineWidth =
          (this.lineWidth[1] - this.lineWidth[0]) * dP + this.lineWidth[0];
        ctx.stroke();
      }
    }
    this.lastDrawn = Date.now();
  }
}

if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const style = getComputedStyle(document.body);
  const alpha = 0.25;
  const colors = [
    `hsla(${style.getPropertyValue("--blue")} / ${alpha})`,
    `hsla(${style.getPropertyValue("--yellow")} / ${alpha})`,
    `hsla(${style.getPropertyValue("--red")} / ${alpha})`,
    `hsla(${style.getPropertyValue("--lime")} / ${alpha})`,
  ];
  const manager = new CanvasManager({
    density: 0.00005,
    createFn: (size) => {
      return new AminationObject({
        radius: randInt(5, 10),
        vision: 100,
        position: [randFloat(0, size[0]), randFloat(0, size[1])],
        vector: [randFloat(-1, 1), randFloat(-1, 1)],
        speed: randFloat(0.01, 0.1),
        color: randItem(colors),
        lineWidth: [1, 5],
      });
    },
  });
  manager.createCanvas();
  manager.draw();
}
