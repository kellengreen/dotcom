class Squares {
    /**
     * Squares Background
     * @author Kellen Green
     */
    constructor() {
        this.container = document.createElement('div')
        this.container.classList.add('squares')
        document.body.appendChild(this.container)
        this.createChildren()
        window.addEventListener('resize', this.debounce(this.createChildren, 200, this))
    }

    get widthPerChild()     { return 12 }
    get minScale()          { return 0.5 }
    get maxScale()          { return 1.0 }
    get minRotate()         { return 500 }
    get maxRotate()         { return 1500 }
    get minGravity()        { return 50 }
    get maxGravity()        { return 125 }

    /**
     * Simple debounce function.
     * @param {function} fn - Function to be called back.
     * @param {number} delay - Milliseconds to wait before calling.
     * @param {object} bind - Object to bind the function to.
     * @return {undefined}
     */
    debounce(fn, delay, bind) {
        let timeout
        return (...args) => {
            if (timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => {
                timeout = null
                fn.apply(bind, args)
            }, delay)
        }
    }

    /**
     * Returns a pseudo random float between two values.
     * @param {number} min - Low range value inclusive.
     * @param {number} max - High range value exclusive.
     * @returns {number}
     */
    randBetween(min, max) {
        return Math.random() * (max - min) + min
    }

    /**
     * Create child elements and starts animations.
     * @returns {undefined}
     */
    createChildren() {
        // Set viewport dimension specific properties.
        const viewportWidth =  window.innerWidth
        const viewportHeight = window.innerHeight
        const targetChildren = viewportWidth / this.widthPerChild

        // Remove unnecessary children.
        while (this.container.children.length > targetChildren) {
            this.container.removeChild(this.container.lastElementChild)
        }

        // Create more children as needed.
        while (this.container.children.length < targetChildren) {
            this.container.appendChild(document.createElement('div'))
        }

        // Set child styles.
        for (let i = 0, elem; elem = this.container.children[i]; i++) {
            elem.style.setProperty('--tx', `${viewportWidth * Math.random()}px`)
            elem.style.setProperty('--rx', this.randBetween(-1, 1))
            elem.style.setProperty('--ry', this.randBetween(-1, 1))
            elem.style.setProperty('--rz', this.randBetween(-1, 1))
            elem.style.setProperty('--ra', `${this.randBetween(this.minRotate, this.maxRotate)}deg`)
            elem.style.setProperty('--scale', this.randBetween(this.minScale, this.maxScale))
            elem.style.setProperty('--duration', `${viewportHeight / this.randBetween(this.minGravity, this.maxGravity)}s`)
        }
    }
}

new Squares()
