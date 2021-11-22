import { randFloat, randInt, randItem } from "./rand.js";

class CanvasManager {
  /**
   * Manages a <canvas> element size and draw callbacks.
   */
  constructor({ density, createObject }) {
    this.canvas;
    this.ctx;
    this.objects = [];
    this.size = {
      width: 0,
      height: 0,
    };
    this.density = density * 0.00001;
    this.createObject = createObject;

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
    this.size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
  };

  /**
   *
   */
  draw = () => {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height);

    const desiredCount = Math.floor(
      this.size.width * this.size.height * this.density
    );
    const currentCount = this.objects.length;

    const addCount = desiredCount - currentCount;
    for (let i = 0; i < addCount; i++) {
      this.objects.push(this.createObject(this.size));
    }

    const removeCount = currentCount - desiredCount;
    for (let i = 0; i < removeCount; i++) {
      this.objects.pop();
    }

    for (const object of this.objects) {
      object.draw(this.ctx, this.size, this.objects);
    }

    requestAnimationFrame(this.draw);
  };
}

class AminationObject {
  /**
   *
   */
  constructor({ center, vector, radius, color, speed, vision, lineWidth }) {
    this.center = center;
    this.vector = vector;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.vision = vision;
    this.lineWidth = lineWidth;
    this.neighbours = new Set();
  }

  updatePosition(idx, length) {
    this.center[idx] += this.vector[idx] * this.speed;

    // Too small
    if (this.center[idx] <= -this.radius) {
      this.center[idx] = length + this.radius;
    }
    // Too big
    else if (this.center[idx] >= length + this.radius) {
      this.center[idx] = -this.radius;
    }
  }

  draw(ctx, size, others) {
    this.updatePosition(0, size.width);
    this.updatePosition(1, size.height);

    ctx.beginPath();
    ctx.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    for (const other of others) {
      if (other === this) {
        continue;
      }
      const dX = other.center[0] - this.center[0];
      const dY = other.center[1] - this.center[1];
      const d = Math.sqrt(dX ** 2 + dY ** 2);
      const dMin = this.radius + other.radius;
      const dMax = dMin + this.vision;
      if (d >= dMin && d <= dMax) {
        const dP = 1 - (d - dMin) / (dMax - dMin);
        const s1 = this.radius / d;
        const s2 = 1 - other.radius / d;
        const x3 = s1 * dX + this.center[0];
        const y3 = s1 * dY + this.center[1];
        const x4 = s2 * dX + this.center[0];
        const y4 = s2 * dY + this.center[1];
        ctx.beginPath();
        ctx.moveTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.strokeStyle = this.color;
        ctx.lineWidth =
          (this.lineWidth[1] - this.lineWidth[0]) * dP + this.lineWidth[0];
        ctx.stroke();
      }
    }
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
    density: 5,
    createObject: (size) => {
      return new AminationObject({
        radius: randInt(5, 10),
        vision: 100,
        center: [randFloat(0, size.width), randFloat(0, size.height)],
        vector: [randFloat(-1, 1), randFloat(-1, 1)],
        speed: randFloat(1, 2),
        color: randItem(colors),
        lineWidth: [1, 5],
      });
    },
  });
  manager.createCanvas();
  manager.draw();
}
