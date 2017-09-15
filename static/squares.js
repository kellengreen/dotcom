class Squares {
    /**
     * Squares Background
     * @author Kellen Green
     */
    constructor() {
        this.viewportWidth = 0;
        this.viewportHeight = 0;
        this.targetChildren = 0;
        this.activeChildren = new Set();
        this.inactiveChildren = new Set();

        this.container = document.createElement('div');
        this.container.classList.add('squares');
        document.body.appendChild(this.container);

        this.createChildren();
        window.addEventListener('resize', this.createChildren.bind(this));
    }

    get widthPerChild() { return 10 };
    get minScale()      { return 0.5 };
    get maxScale()      { return 1.0 };
    get minRotate()     { return 500 };
    get maxRotate()     { return 1000 };
    get minGravity()    { return 0.040 };
    get maxGravity()    { return 0.120 };
    get minOpacity()    { return 0.0 };
    get maxOpacity()    { return 0.5 };

    /**
     * Returns a pseudo random floating point number between two values.
     * @param {float} min - Low range value inclusive.
     * @param {float} max - High range value exclusive.
     * @returns {float}
     */
    randFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Create child elements and starts animations.
     * @returns {undefined}
     */
    createChildren() {
        // Set viewport dimension specific properties.
        this.viewportWidth = window.innerWidth;
        this.viewportHeight = window.innerHeight;
        this.targetChildren = Math.floor(this.viewportWidth / this.widthPerChild);

        // Set hasResized to true for active elements
        for (const elem of this.activeChildren.values()) {
            elem.$hasResized = true;
        }

        // Create more children as needed
        const iter = this.inactiveChildren[Symbol.iterator]();
        while (this.activeChildren.size < this.targetChildren) {
            let elem = iter.next().value;

            // create new element if none available
            if (elem === undefined) {
                elem = document.createElement('div');
                this.container.appendChild(elem);
            }
            
            // otherwise remove the previous element from inactive
            else {
                this.inactiveChildren.delete(elem);
            }

            this.activeChildren.add(elem);
            this.createAnimation(elem);
        }
    }

    /**
     * Creates an animation for a child element.
     * @param {HTMLElement} elem - Element to be animated.
     * @returns {undefined}
     */
    createAnimation(elem) {
        const rotateX = Math.random();
        const rotateY = Math.random();
        const rotateZ = Math.random();
        const rotateA = this.randFloat(this.minRotate, this.maxRotate);
        const scale = this.randFloat(this.minScale, this.maxScale);
        const translateX = this.viewportWidth * Math.random();
        const translateY = this.viewportHeight;
        const duration = translateY / this.randFloat(this.minGravity, this.maxGravity);
        const transformStart = `
            translate(${translateX}px, 0)
            scale(${scale})
            rotate3d(${rotateX}, ${rotateY}, ${rotateZ}, ${rotateA}deg)`;
        const transformEnd = `
            translate(${translateX}px, ${translateY}px)
            scale(${scale})
            rotate3d(0, 0, 0, 0deg)`;

        const keyFrames = {
            transform: [transformStart, transformEnd],
            opacity: [this.maxOpacity, this.minOpacity],
        };

        const options = {
            duration: duration,
            iterations: 1,
        };

        const animation = elem.animate(keyFrames, options);
        elem.$hasResized = false;
        animation.onfinish = () => {
            this.finishedAnimation(animation, elem);
        }
    }

    /**
     * Callback when an animation has finished.
     * @param {Animation} animation
     * @param {HTMLElement} elem
     * @returns {undefined}
     */
    finishedAnimation(animation, elem) {
        // has resize occured since last animation
        if (elem.$hasResized === true) {

            // remove children from active pool if overcrowded
            if (this.activeChildren.size > this.targetChildren) {
                this.activeChildren.delete(elem);
                this.inactiveChildren.add(elem);
            }
            // create new animation
            else {
                this.createAnimation(elem);
            }
        } 
        // replay animation
        else {
            animation.play();
        }
    }
}

new Squares();
