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

     static randFloat(min, max) {
         return Math.random() * (max - min) + min;
     }

     static randInt(min, max) {
         return Math.floor(Math.random() * (max - min + 1)) + min;
     }

     fallingAnimation(windowWidth, windowHeight) {
         const rotateX = Math.random(),
               rotateY = Math.random(),
               rotateZ = Math.random(),
               rotateA = SquareElem.randFloat(SquareElem.minRotate, SquareElem.maxRotate),
               scale = SquareElem.randFloat(SquareElem.minScale, SquareElem.maxScale),
               translateX = windowWidth * Math.random(),
               translateY = windowHeight + SquareElem.overscan,
               duration = SquareElem.randFloat(SquareElem.minDuration, SquareElem.maxDuration),
               transformStart = `translate(${translateX}px, -${SquareElem.overscan}px) scale(${scale}) rotate3d(0, 0, 0, 0deg)`,
               transformEnd =   `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate3d(${rotateX}, ${rotateY}, ${rotateZ}, ${rotateA}deg)`;
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

SquareElem.overscan = 30;
SquareElem.minScale = .5;
SquareElem.maxScale = 1;
SquareElem.minRotate = 500;
SquareElem.maxRotate = 1000;
SquareElem.minDuration = 6000;
SquareElem.maxDuration = 20000;
SquareElem.baseClass = 'square';
SquareElem.colorClasses = ['red', 'blue', 'green', 'yellow'];

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

SquareContainer.pxPerSquare = 12;
SquareContainer.baseClass = 'squares';

new SquareContainer();
