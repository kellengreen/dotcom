 /**
  * Name: Squares Background
  * Author: Kellen Green
  */
 
(function() {

    function ready(callback) {
        if (document.readyState === 'loading') {
            var event = 'readystatechange';
            document.addEventListener(event, function listener() {
                document.removeEventListener(event, listener);
                callback();
            });
        } else callback();
    }

    ready(function() {

        /**
         * SquareElem
         */

        function SquareElem() {
            this.elem = document.createElement('div');
            this.elem.classList.add(this.baseClass);
            this.elem.classList.add(this.colorClasses[this.randInt(0, 3)]);
        }

        SquareElem.prototype.overscan = 30;
        SquareElem.prototype.minScale = .5;
        SquareElem.prototype.maxScale = 1;
        SquareElem.prototype.minRotate = 500;
        SquareElem.prototype.maxRotate = 1000;
        SquareElem.prototype.minDuration = 6000;
        SquareElem.prototype.maxDuration = 20000;
        SquareElem.prototype.baseClass = 'square';
        SquareElem.prototype.colorClasses = ['red', 'blue', 'green', 'yellow'];

        SquareElem.prototype.randFloat = function(min, max) {
            return Math.random() * (max - min) + min;
        };

        SquareElem.prototype.randInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        SquareElem.prototype.animation = function(windowWidth, windowHeight) {

            var rotateX = Math.random(),
                rotateY = Math.random(),
                rotateZ = Math.random(),
                rotateA = this.randInt(this.minRotate, this.maxRotate),

                scale = this.randFloat(this.minScale, this.maxScale),
                duration = this.randFloat(this.minDuration, this.maxDuration),

                translateX = windowWidth * Math.random(),
                translateY =  windowHeight + this.overscan,

                transformStart = 'translate(' + translateX + 'px,' + -this.overscan + 'px) ' +
                'rotate3d(0,0,0,0deg) ' +
                'scale(' + scale + ')',

                transformEnd = 'translate(' + translateX + 'px,' + translateY + 'px) ' +
                    'rotate3d(' + rotateX + ',' + rotateY + ',' + rotateZ + ',' + rotateA + 'deg) ' +
                    'scale(' + scale + ')';

            return this.elem.animate([
                {transform: transformStart},
                {transform: transformEnd}
            ], {
                duration: duration,
                iterations: 1
            });
        };

        /**
         * SquareManager
         */

        function SquareManager(selector) {
            this.container = document.querySelector(selector);
            this.squaresDrawn = 0;
            this.setDimensions();
            window.addEventListener('resize', this.resize.bind(this));
        }

        SquareManager.prototype.widthPerSquare = 12;

        SquareManager.prototype.setDimensions = function() {
            this.rafPending = false;
            this.windowWidth = window.innerWidth;
            this.windowHeight = window.innerHeight;
            this.targetSquares = Math.round(this.windowWidth / this.widthPerSquare);
            this.drawSquares();
        };

        SquareManager.prototype.resize = function() {
            if (this.rafPending === false) {
                this.rafPending = true;
                window.requestAnimationFrame(this.setDimensions.bind(this));
            }
        };

        SquareManager.prototype.drawSquares = function() {
            var squaresToDraw = this.targetSquares - this.squaresDrawn;
            for (var i = 0; i < squaresToDraw; i++) {
                var square = new SquareElem();
                this.animationStart(square);
                this.container.appendChild(square.elem);
                this.squaresDrawn += 1;
            }
        };

        SquareManager.prototype.animationStart = function(square) {
            var animation = square.animation(this.windowWidth, this.windowHeight);
            animation.onfinish = this.animationEnd.bind(this, square);
        };

        SquareManager.prototype.animationEnd = function(square) {
            if (this.targetSquares >= this.squaresDrawn) {
                this.animationStart(square);
            } else {
                this.container.removeChild(square.elem);
                this.squaresDrawn -= 1;
            }
        };

        new SquareManager('#squares');
    });
})();
