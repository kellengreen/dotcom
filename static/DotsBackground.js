import { randFloat, randInt, randItem } from "./rand.js";

export default class DotsBackground {
  /**
   * Manages a <canvas> element size and draw callbacks.
   */
  constructor({
    objectDensity,
    objectCount,
    colors,
    speedMin = 0.01,
    speedMax = 0.1,
    sizeMin = 5,
    sizeMax = 10,
  }) {
    this.objectDensity = objectDensity;
    this.objectCount = objectCount;
    this.colors = colors;
    this.speedMin = speedMin;
    this.speedMax = speedMax;
    this.sizeMin = sizeMin;
    this.sizeMax = sizeMax;
    this.objects = [];
  }

  /**
   * Loop for draw callbacks.
   */
  paint(ctx, size) {
    const desiredCount =
      this.objectCount ??
      Math.floor(size.width * size.height * this.objectDensity);

    const difference = desiredCount - this.objects.length;
    if (difference != 0) {
      console.log(difference);
    }

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        this.objects.push(
          new AminationObject({
            radius: randInt(this.sizeMin, this.sizeMax),
            vision: 100,
            position: [randFloat(0, size.width), randFloat(0, size.height)],
            vector: [randFloat(-1, 1), randFloat(-1, 1)],
            speed: randFloat(this.speedMin, this.speedMax),
            color: randItem(this.colors),
            lineWidth: [1, 5],
          })
        );
      }
    }

    for (let i = 0; i > difference; i--) {
      this.objects.pop();
    }

    for (const object of this.objects) {
      object.paint(ctx, size, this.objects);
    }
  }
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
  paint(ctx, size, others) {
    const sizeArr = [size.width, size.height];
    const delay = Date.now() - this.lastDrawn;
    const movement = this.speed * delay;

    for (let i = 0; i <= 1; i++) {
      this.position[i] += this.vector[i] * movement;
      if (this.position[i] <= -this.radius) {
        this.position[i] = sizeArr[i] + this.radius;
      } else if (this.position[i] >= sizeArr[i] + this.radius) {
        this.position[i] = -this.radius;
      }
    }

    ctx.beginPath();
    ctx.arc(this.position[0], this.position[1], this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();

    for (const other of others) {
      //   if (other === this) {
      //     continue;
      //   }
      const dX = other.position[0] - this.position[0];
      // const dY = other.position[1] - this.position[1];
      // const d = Math.sqrt(dX ** 2 + dY ** 2);
      //   const dMin = this.radius + other.radius;
      //   const dMax = dMin + this.vision;
      //   if (d >= dMin && d <= dMax) {
      //     const dP = 1 - (d - dMin) / (dMax - dMin);
      //     const s1 = this.radius / d;
      //     const s2 = 1 - other.radius / d;
      //     const x3 = s1 * dX + this.position[0];
      //     const y3 = s1 * dY + this.position[1];
      //     const x4 = s2 * dX + this.position[0];
      //     const y4 = s2 * dY + this.position[1];
      //     ctx.beginPath();
      //     ctx.moveTo(x3, y3);
      //     ctx.lineTo(x4, y4);
      //     ctx.strokeStyle = this.color;
      //     ctx.lineWidth =
      //       (this.lineWidth[1] - this.lineWidth[0]) * dP + this.lineWidth[0];
      //     ctx.stroke();
      //   }
    }
    this.lastDrawn = Date.now();
  }
}
