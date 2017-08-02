class Squares {
    /**
     * Class:   Squares Background
     * Author:  Kellen Green
     */
    constructor() {
        /**
         *
         */
        this.container;
        this.setContainer();

        this.viewportWeight;
        this.viewportHeight;
        this.squareTarget;
        this.squareElems = new Map();
        this.addSquares();

        window.addEventListener('resize', this.debounce(this.addSquares, 250));
    }

    get pxPerSquare()   { return 12 };
    get overscan()      { return 30 };
    get minScale()      { return .33 };
    get maxScale()      { return 1 };
    get minRotate()     { return 500 };
    get maxRotate()     { return 1000 };
    get minGravity()    { return .040 };
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

    setContainer() {
        /**
         *
         */
        this.container = document.createElement('div');
        this.container.classList.add('squares');
        document.body.appendChild(this.container);
    }

    setDimentions() {
        /**
         * Sets window dimension specific properties.
         */
        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
        this.squareTarget = Math.floor(this.viewportWidth / this.pxPerSquare);
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

    addSquares() {
        /**
         * Start the animations
         */
        this.setDimentions();

        // Set hasResized to true for previously created elements
        for (const elem of this.squareElems.keys()) {
            this.squareElems.set(elem, true);
        }

        while (this.squareElems.size < this.squareTarget) {
            this.createSquare();
        }
    }

    createSquare() {
        /**
         * Create square element
         */
        const elem = document.createElement('div');
        const colorIdx = this.randInt(0, this.colorClasses.length - 1);
        const colorClass = this.colorClasses[colorIdx];

        elem.classList.add(colorClass);
        this.container.appendChild(elem);
        this.createAnimation(elem);
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
        const translateX = (this.viewportWidth - this.overscan) * Math.random();
        const translateY = this.viewportHeight + this.overscan;
        const duration = translateY / this.randFloat(this.minGravity, this.maxGravity);
        const transformStart = `
            translate(${translateX}px, 0)
            scale(${scale})
            rotate3d(0, 0, 0, 0deg)`;
        const transformEnd = `
            translate(${translateX}px, ${translateY}px)
            scale(${scale})
            rotate3d(${rotateX}, ${rotateY}, ${rotateZ}, ${rotateA}deg)`;

        const keyFrames = {
            transform: [transformStart, transformEnd],
            opacity: [.5, 0],
        };

        const options = {
            duration: duration,
            iterations: 1,
        };

        const animation = elem.animate(keyFrames, options);

        this.squareElems.set(elem, false);

        animation.onfinish = () => {
            this.finishedAnimation(elem, animation);
        }
    }

    finishedAnimation(elem, animation) {
        /**
         * Callback when animation has finished.
         */

        // Too many elements
        if (this.squareElems.size > this.squareTarget) {
            elem.remove();
            this.squareElems.delete(elem);
        }

        // Window resize since last animation
        else if (this.squareElems.get(elem) === true) {
            this.createAnimation(elem);
        }

        // Replate previous animation
        else {
            animation.play();
        }
    }
}

new Squares();
