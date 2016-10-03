 /**
  * Name:   Squares Background
  * Author: Kellen Green
  */

class SquareElem {
     /**
      * SquareElem
      */
    constructor() {
        this.elem = document.createElement('div');
        this.elem.classList.add(SquareElem.baseClass);
        this.elem.classList.add(SquareElem.colorClasses[SquareElem.randInt(0, SquareElem.colorClasses.length - 1)]);
    }

    static get overscan() { return 30 };
    static get minScale() { return .5 };
    static get maxScale() { return 1 };
    static get minRotate() { return 500 };
    static get maxRotate() { return 1000 };
    static get minDuration() { return 6000 };
    static get maxDuration() { return 20000 };
    static get baseClass() { return 'square' };
    static get colorClasses() { return ['red', 'blue', 'green', 'yellow'] };

    static randFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    static randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    fallingAnimation(windowWidth, windowHeight) {
        const rotateX = Math.random();
        const rotateY = Math.random();
        const rotateZ = Math.random();
        const rotateA = SquareElem.randFloat(SquareElem.minRotate, SquareElem.maxRotate);
        const scale = SquareElem.randFloat(SquareElem.minScale, SquareElem.maxScale);
        const translateX = windowWidth * Math.random();
        const translateY = windowHeight + SquareElem.overscan;
        const duration = SquareElem.randFloat(SquareElem.minDuration, SquareElem.maxDuration);
        const transformStart = `translate(${translateX}px, -${SquareElem.overscan}px) scale(${scale}) rotate3d(0, 0, 0, 0deg)`;
        const transformEnd =   `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate3d(${rotateX}, ${rotateY}, ${rotateZ}, ${rotateA}deg)`;

        return this.elem.animate([
            {transform: transformStart, opacity: 1},
            {transform: transformEnd, opacity: 1},
        ], {
            duration: duration,
            iterations: Infinity,
        });
    }

    fadeAnimation() {
        return this.elem.animate([
            {opacity: 1},
            {opacity: 0},
        ], {duration: 1000});
    }
}

class SquareContainer {
    /**
     * SquareContainer
     */
    constructor() {
        this.elem = document.createElement('div');
        this.elem.classList.add(SquareContainer.baseClass);
        document.body.appendChild(this.elem);

        this.initAnimations();
        window.addEventListener('resize', this.debounce(this.resize, 100));
    }

    static get pxPerSquare() { return 12 };
    static get baseClass() { return 'squares' };

    debounce(fn, delay) {
        let timeout;
        return (...args) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(this, args);
            }, delay);
        };
    }

    resize() {
        this.squareElems.forEach(squareElem => {
            squareElem.fadeAnimation().onfinish = () => {
                this.elem.removeChild(squareElem.elem);
            };
        });
        this.initAnimations();
    }

    initAnimations() {
        const currentWindowWidth = window.innerWidth,
              currentWindowHeight = window.innerHeight,
              targetSquareCount = currentWindowWidth / SquareContainer.pxPerSquare;

        this.squareElems = [];
        for (let i = 0; i < targetSquareCount; i++) {
            const squareElem = new SquareElem();
            squareElem.fallingAnimation(currentWindowWidth, currentWindowHeight);
            this.squareElems.push(squareElem);
            this.elem.appendChild(squareElem.elem);
        }
    }
}

new SquareContainer();
