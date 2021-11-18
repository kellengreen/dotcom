import { randFloat, randInt, randItem } from "./rand.js";

class AnimationManager {
  /**
   *
   */
  constructor({ colors, density, speed }) {
    this.canvas;
    this.ctx;
    this.colors = colors;
    this.density = density * 0.00001;
    this.speed = speed;
    this.size = {
      width: 0,
      height: 0,
    };
    this.objects = [];

    addEventListener("resize", this.setDimensions);
  }

  /**
   *
   */
  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    document.body.appendChild(this.canvas);
  }

  /**
   *
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
      this.objects.push(
        new AminationObject({
          radius: 5,
          x: randInt(0, this.canvas.width),
          y: randInt(0, this.canvas.height),
          vX: randFloat(-1, 1),
          vY: randFloat(-1, 1),
          speed: randFloat(...this.speed),
          color: randItem(this.colors),
        })
      );
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
  constructor({ x, y, vX, vY, radius, color, speed, vision = 10 }) {
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.vision = vision;
    this.neighbours = new Set();
  }

  updatePosition(prop, slope, length) {
    this[prop] += this[slope] * this.speed;

    // Too small
    if (this[prop] <= -this.radius) {
      this[prop] = length + this.radius;
    }
    // Too big
    else if (this[prop] >= length + this.radius) {
      this[prop] = -this.radius;
    }
  }

  draw(ctx, size, others) {
    this.updatePosition("x", "vX", size.width);
    this.updatePosition("y", "vY", size.height);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();

    for (const other of others) {
      if (other === this) {
        continue;
      }

      const x = Math.pow(other.x - this.x, 2);
      const y = Math.pow(other.y - this.y, 2);
      const d = Math.sqrt(x + y);
      if (d <= this.radius * this.vision * 2) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
      }
    }
  }
}

if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const style = getComputedStyle(document.body);
  const alpha = 0.5;
  console.log(`'${style.getPropertyValue("--blue")}'`);

  const manager = new AnimationManager({
    density: 5,
    speed: [1, 2],
    colors: [
      `hsla(${style.getPropertyValue("--blue")} / ${alpha})`,
      `hsla(${style.getPropertyValue("--yellow")} / ${alpha})`,
      `hsla(${style.getPropertyValue("--red")} / ${alpha})`,
      `hsla(${style.getPropertyValue("--lime")} / ${alpha})`,
    ],
  });
  manager.createCanvas();
  manager.draw();
}
