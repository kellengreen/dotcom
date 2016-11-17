 /**
  * Name:   Squares Background
  * Author: Kellen Green
  * Date:   2016/11/17
  */
(class SquaresManager {
    /**
     * SquaresManager class
     */
    constructor() {
        /**
         * 
         */
        this.container = document.createElement('div');
        this.squareElements = [];
        this.squareElements = [];

        // create container
        this.container.classList.add(SquareContainer.baseClass);
        document.body.appendChild(this.container);

        this.initAnimations();
        window.addEventListener('resize', this.debounce(this.onResize, 100));
    }

    /**
     * class variables
     */
    get pxPerSquare() { return 12 };
    get overscan() { return 30 };
    get minScale() { return .5 };
    get maxScale() { return 1 };
    get minRotate() { return 500 };
    get maxRotate() { return 1000 };
    get minDuration() { return 6000 };
    get maxDuration() { return 20000 };
    get baseClass() { return 'squares' };   
    get colorClasses() { return ['red', 'blue', 'green', 'yellow'] }; 

    randFloat(min, max) {
        /**
         * Returns a pseudo random floating point number between two numbers.
         */
        return Math.random() * (max - min) + min;
    }

    randInt(min, max) {
        /**
         * Returns a pseudo random integer between two numbers.
         */
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }        

    debounce(fn, delay) {
        /**
         * Simple debounce function.
         */
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

    onResize() {
        /**
         * Called when the window is resized.
         */
        this.squareElems.forEach(squareElem => {
            squareElem.fadeAnimation().onfinish = () => {
                this.container.removeChild(squareElem.elem);
            };
        });
        this.initAnimations();
    }

    fallingAnimation(elem, windowWidth, windowHeight) {
        /**
         * 
         */
        const rotateX = Math.random();
        const rotateY = Math.random();
        const rotateZ = Math.random();
        const rotateA = Square.randFloat(Square.minRotate, Square.maxRotate);
        const scale = Square.randFloat(Square.minScale, Square.maxScale);
        const translateX = windowWidth * Math.random();
        const translateY = windowHeight + Square.overscan;
        const duration = Square.randFloat(Square.minDuration, Square.maxDuration);
        const transformStart = `translate(${translateX}px, -${SquareElem.overscan}px) scale(${scale}) rotate3d(0, 0, 0, 0deg)`;
        const transformEnd = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate3d(${rotateX}, ${rotateY}, ${rotateZ}, ${rotateA}deg)`;

        const keyFrames = [];
        const options = {};

        return this.elem.animate([
            {
                transform: transformStart, 
                opacity: 1,
            },
            {
                transform: transformEnd,
                opacity: 1,
            },
        ], {
            duration: duration,
            iterations: Infinity,
        });
    }

    fadeAnimation() {
        /**
         * 
         */
        return this.elem.animate([
            {opacity: 1},
            {opacity: 0},
        ], {duration: 1000});
    }      

    addSquareElement() {
        /**
         * Initialize a square element.
         */
        this.elem = document.createElement('div');
        this.initElement();

        const colorClass = Square.randInt(0, Square.colorClasses.length - 1);        
        this.elem.classList.add(Square.baseClass);
        this.elem.classList.add(colorClass);        
    }    

    initAnimations() {
        /**
         * 
         */
        const currentWindowWidth = window.innerWidth,
              currentWindowHeight = window.innerHeight,
              targetSquareCount = currentWindowWidth / SquareContainer.pxPerSquare;

        this.squareElems = [];
        for (let i = 0; i < targetSquareCount; i++) {
            const squareElem = new SquareElem();
            squareElem.fallingAnimation(currentWindowWidth, currentWindowHeight);
            this.squareElems.push(squareElem);
            this.container.appendChild(squareElem.container);
        }
    }
})();
