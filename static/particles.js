/**
 * Particles Background
 * @author Kellen Green
 */

class Particles {

    constructor() {
        this.clickX = null
        this.clickY = null

        this.elem = document.createElement('canvas')
        this.elem.style.position = 'fixed'
        this.elem.style.top = '0'
        this.elem.style.left = '0'
        this.elem.style.zIndex = '-1'
        document.body.appendChild(this.elem)

        this.ctx = this.elem.getContext('2d')

        const style = getComputedStyle(this.elem)
        this.colors = [
            style.getPropertyValue('--lime'),
            style.getPropertyValue('--red'),
            style.getPropertyValue('--blue'),
            style.getPropertyValue('--orange'),
        ]
        
        this.items = []

        this.resize()
        window.requestAnimationFrame(this.paint.bind(this))
        window.addEventListener('resize', this.resize.bind(this))
        window.addEventListener('click', this.click.bind(this))
    }

    paint() {
        this.ctx.clearRect(0, 0, this.elem.width, this.elem.height)



        for (const item of this.items) {

            item.y += item.speed
            if (item.y > this.viewportHeight) {
                item.y = 0
            }

            this.ctx.fillStyle = item.color
            this.ctx.fillRect(0, 0, 10, 10)

        }
        window.requestAnimationFrame(this.paint.bind(this))
    }

    resize() {
        this.elem.width = window.innerWidth
        this.elem.height = window.innerHeight

        for (let i = this.items.length; i < this.elem.width; i++) {
            this.items.push({
                x: i,
                y: 0,
                lane: i,
                speed: Math.random() * 10,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
            })
        }
    }

    click(evt) {
        this.clickX = evt.pageX
        this.clickY = evt.pageY
    }
}

new Particles()