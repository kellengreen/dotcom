class Snow {
    /**
     * Snow Background
     * @author Kellen Green
     */
    constructor() {
        this.elem = document.createElement('canvas')
        this.elem.style.position = 'fixed'
        this.elem.style.top = '0'
        this.elem.style.left = '0'
        this.elem.style.zIndex = '-1'
        
        document.body.appendChild(this.elem)

        this.ctx = this.elem.getContext('2d')
        this.items = []

        window.addEventListener('resize', this.createChildren.bind(this))
        window.requestAnimationFrame(this.loop.bind(this))
        
        this.createChildren()

    }

    get size() { return 1 }
    get colors() { return [] }


    loop() {
        this.ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight)
        // this.ctx.fillStyle = 'green'
        for (const item of this.items) {

            item.y += item.speed
            if (item.y > this.viewportHeight) {
                item.y = 0
            }

            this.ctx.fillStyle = item.color
            this.ctx.fillRect(item.x, item.y, 1, 1)

        }
        window.requestAnimationFrame(this.loop.bind(this))
    }



    get pxPerChild()        { return 10000 }
    get maxChildren()       { return 200 }
    get minScale()          { return 0.5 }
    get maxScale()          { return 1.0 }
    get minRotate()         { return 25 }
    get maxRotate()         { return 100 }
    get minGravity()        { return 25 }
    get maxGravity()        { return 100 }

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
        this.viewportWidth =  window.innerWidth
        this.viewportHeight = window.innerHeight

        this.elem.width = window.innerWidth
        this.elem.height = window.innerHeight

        // Create more children as needed.
        for (let i = 0; i < this.viewportWidth; i++) {
            const item = new Item({x:i, y:2})
            this.items.push(item)
        }

    }
}

class Item {
    constructor({x=0, y=0}={}) {
        this.x = x
        this.y = y
        this.speed = Math.random() * 10
        this.color = `#${Math.random().toString(16).substr(2,6)}`
    }
}

new Snow()
