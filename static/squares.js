if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  // START
}

class Squares {
  /**
   * Squares Background
   * @author Kellen Green
   */
  constructor() {
    this.prevWidth = 0
    this.prevHeight = 0

    this.container = document.createElement('div')
    this.container.classList.add('squares')
    document.body.appendChild(this.container)

    const style = getComputedStyle(document.body)
    this.colors = [
      style.getPropertyValue('--lime'),
      style.getPropertyValue('--red'),
      style.getPropertyValue('--blue'),
      style.getPropertyValue('--orange'),
    ]

    this.createChildren()
    window.addEventListener(
      'resize',
      this.debounce(this.createChildren, 200, this),
    )
  }

  get pxPerChild() {
    return 10000
  }
  get maxChildren() {
    return 200
  }
  get minScale() {
    return 0.5
  }
  get maxScale() {
    return 1.0
  }
  get minRotate() {
    return 25
  }
  get maxRotate() {
    return 100
  }
  get minGravity() {
    return 25
  }
  get maxGravity() {
    return 100
  }

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
    const currentWidth = window.innerWidth
    const currentHeight = window.innerHeight

    // if (this.prevHeight !== 0) {
    //     return
    // }

    const targetChildren = Math.min(
      (currentWidth * currentHeight) / this.pxPerChild,
      this.maxChildren,
    )

    // Remove unnecessary children.
    while (this.container.children.length > targetChildren) {
      this.container.removeChild(this.container.lastElementChild)
    }

    // Create more children as needed.
    while (this.container.children.length < targetChildren) {
      this.container.appendChild(document.createElement('div'))
    }

    // Set child styles.
    for (let i = 0, elem; (elem = this.container.children[i]); i++) {
      const duration =
        currentHeight / this.randBetween(this.minGravity, this.maxGravity)
      elem.style.setProperty('--tx', `${currentWidth * Math.random()}px`)
      elem.style.setProperty('--rx', this.randBetween(-1, 1))
      elem.style.setProperty('--ry', this.randBetween(-1, 1))
      elem.style.setProperty('--rz', this.randBetween(-1, 1))
      elem.style.setProperty(
        '--ra',
        `${this.randBetween(this.minRotate, this.maxRotate) * duration}deg`,
      )
      elem.style.setProperty(
        '--scale',
        this.randBetween(this.minScale, this.maxScale),
      )
      elem.style.setProperty('--duration', `${duration}s`)
    }

    this.prevWidth = currentWidth
    this.prevHeight = currentHeight
  }

  /**
   *
   */
  resize() {}

  /**
   *
   */
  yChanged() {}

  /**
   *
   */
  xchanged() {}
}

new Squares()
