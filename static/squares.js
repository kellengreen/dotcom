 /**
  * Name:   Squares Background
  * Author: Kellen Green
  * Date:   2016/11/17
  */
class Squares {
    constructor() {
        /**
         * 
         */
        this.container = null;
        this.staleAnimations = new Set();
        this.animations = new Map();
        this.targetSquareCount = 0;
        this.currentSquareCount = 0;
        this.currentWindowWidth = 0;
        this.currentWindowHeight = 0;

        this.setContainer();
        this.setSizeProps();

        this.initAnimation();
        window.addEventListener('resize', this.debounce(this.setSizeProps, 100));
    }

    /**
     * Class static properties.
     */
    get pxPerSquare()   { return 12 };
    get overscan()      { return 30 };
    get minScale()      { return .5 };
    get maxScale()      { return 1 };
    get minRotate()     { return 500 };
    get maxRotate()     { return 1000 };
    get minGravity()    { return .050 };
    get maxGravity()    { return .125 };
    get colorClasses()  { return ['red', 'blue', 'green', 'yellow'] };

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
        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                timeout = null;
                fn.apply(this);
            }, delay);
        };
    }

    setSizeProps() {
        /**
         * Sets window dimension specific properties.
         */
        this.currentWindowWidth = window.innerWidth;
        this.currentWindowHeight = window.innerHeight;
        this.targetSquareCount = Math.floor(this.currentWindowWidth / this.pxPerSquare);
    }

    setContainer() {
        /**
         * Sets the container element.
         */
        this.container = document.createElement('div');
        this.container.classList.add('squares');
        document.body.appendChild(this.container);
    }

    createChild() {
        /**
         * Create child element.
         */
        const elem = document.createElement('div');
        const colorIdx = this.randInt(0, this.colorClasses.length - 1);
        const colorClass = this.colorClasses[colorIdx];
        
        elem.classList.add(colorClass);
        this.container.appendChild(elem);

        const animation = this.createAnimation(elem);
        this.animations.set(animation, elem);
    }

    createAnimation(elem) {
        /**
         * 
         */
        const rotateX = Math.random();
        const rotateY = Math.random();
        const rotateZ = Math.random();
        const rotateA = this.randFloat(this.minRotate, this.maxRotate);
        const scale = this.randFloat(this.minScale, this.maxScale);
        const translateX = (this.currentWindowWidth - this.overscan) * Math.random();
        const translateY = this.currentWindowHeight + this.overscan;
        const duration = (this.overscan + translateY) / this.randFloat(this.minGravity, this.maxGravity);
        const transformStart = `translate(${translateX}px, -${this.overscan}px) scale(${scale}) rotate3d(0, 0, 0, 0deg)`;
        const transformEnd = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate3d(${rotateX}, ${rotateY}, ${rotateZ}, ${rotateA}deg)`;

        const keyFrames = {
            transform: [transformStart, transformEnd],
            opacity: [1.0, 0.1],
        };

        const options = {
            duration: duration,
            iterations: 1,
        };

        const animation = elem.animate(keyFrames, options); 
        animation.onfinish = this.completedAnimation.bind(this);
        return animation;
    }

    completedAnimation(evt) {
        /**
         * Callback when animation has finished. 
         */
        const animation = evt.currentTarget;
        const elem = this.animations.get(animation);
        
        // too many elements
        if (this.animations.size > this.targetSquareCount) {
            this.container.removeChild(elem);
            this.animations.delete(animation);
        }

        else {
            animation.play();
        }
    }

    initAnimation() {
        /**
         * 
         */
        for (let i = 0; i < this.targetSquareCount; i++) {
            this.currentSquareCount++;
            const elem = this.createChildElement();
            this.animationStart(elem);
            // const squareElem = new SquareElem();
            // squareElem.fallingAnimation(currentWindowWidth, currentWindowHeight);
            // this.squareElems.push(squareElem);
            this.containerElement.appendChild(elem);
        }
        
        // too few elements 
        while (this.animations.size < this.targetSquareCount) {
            this.createChild();
        }
        
        while (this.animations.size > this.targetSquareCount) {

        }
    }
}

const squares = new Squares();

console.dir(squares);

const stylesheet = document.styleSheets[0];
console.dir(stylesheet);
const idx = stylesheet.insertRule('body{overflow-y:hidden!important}', stylesheet.cssRules.length);
console.dir(idx);
