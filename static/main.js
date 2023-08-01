import CanvasManager from "./CanvasManager.js";
import DotsBackground from "./DotsBackground.js";
import FpsMonitor from "./FpsMonitor.js";

if (matchMedia("(prefers-reduced-motion: no-preference)").matches) {
  const style = getComputedStyle(document.body);
  const alpha = 0.25;
  const manager = new CanvasManager([
    new DotsBackground({
      objectDensity: 0.00005,
      // objectCount: 10_000,
      colors: [
        `hsla(${style.getPropertyValue("--blue")} / ${alpha})`,
        `hsla(${style.getPropertyValue("--yellow")} / ${alpha})`,
        `hsla(${style.getPropertyValue("--red")} / ${alpha})`,
        `hsla(${style.getPropertyValue("--lime")} / ${alpha})`,
      ],
    }),
    new FpsMonitor(),
  ]);
  manager.init();
  manager.start();
}
