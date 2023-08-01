export default class CanvasManager {
  /**
   * Manages a <canvas> element size and draw callbacks.
   */
  constructor(worklets) {
    this.canvas = null;
    this.ctx = null;
    this.size = { width: 0, height: 0 };
    this.worklets = new Set(worklets);
  }

  /**
   * Creates a new canvas element then injects it into the DOM.
   */
  init() {
    if (this.canvas === null) {
      this.canvas = document.createElement("canvas");
      this.canvas.style.position = "fixed";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.zIndex = "-1";
      this.ctx = this.canvas.getContext("2d");
      this.resize();
      document.body.appendChild(this.canvas);
      addEventListener("resize", this.resize.bind(this));
    }
  }

  /**
   * Updates the dimensions of the viewport.
   */
  resize() {
    this.size.width = window.innerWidth;
    this.size.height = window.innerHeight;
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
  }

  /**
   * Start the animation loop.
   */
  start() {
    const paint = () => {
      this.ctx.clearRect(0, 0, this.size.width, this.size.height);
      for (const worklet of this.worklets.values()) {
        worklet.paint(this.ctx, this.size);
      }
      requestAnimationFrame(paint);
    };
    paint();
  }
}
