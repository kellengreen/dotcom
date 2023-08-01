export default class FpsMonitor {
  constructor({
    bgColor = "black",
    textColor = "white",
    font = "2rem monospace",
  } = {}) {
    this.font = font;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.time = performance.now();
    this.count = 0;
    this.result = {
      text: "",
      width: 0,
      height: 0,
    };
  }

  paint(ctx, size) {
    ctx.font = this.font;

    const now = performance.now();
    if (now - this.time > 1000) {
      const text = `${this.count} FPS`;
      const metrics = ctx.measureText(text);
      this.result.text = text;
      this.result.width = metrics.width;
      this.result.height =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
      this.time = now;
      this.count = 0;
    } else {
      this.count += 1;
    }

    if (this.result.text) {
      const padding = this.result.height * 0.5;
      const bgWidth = this.result.width + padding * 2;
      const bgHeight = this.result.height + padding * 2;
      ctx.fillStyle = this.bgColor;
      ctx.fillRect(size.width - bgWidth, 0, bgWidth, bgHeight);
      ctx.fillStyle = this.textColor;
      ctx.fillText(
        this.result.text,
        size.width - this.result.width - padding,
        this.result.height + padding
      );
    }
  }
}
