/*
 * Name: Squares Background
 * Author: Kellen Green
 * Date: 6/10/2013
 * Version: 1.2
 */
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || /* Chrome 24, FF 23, IE 10  */
                                window.webkitRequestAnimationFrame || /* Safari 6 */
                                window.mozRequestAnimationFrame || /* FF 4-22 */
                                false;
    if (requestAnimationFrame) {
        document.addEventListener('DOMContentLoaded', function() {
            var container = document.getElementById('squares');
            var settings = {
                count: Math.round(window.innerWidth / 15),
                msDelay: 16.67,
                hideHeight: 30,
                minTranslateY: .75,
                maxTranslateY: 4,
                minScale: .5,
                maxScale: 1,
                minRotate: 1,
                maxRotate: 3
            };

            function Square() {
                this.elem = document.createElement('div');
                this.translateX = window.innerWidth * Math.random();
                this.translateY = -settings.hideHeight;
                this.speedTranslateY = this.randBetween(settings.minTranslateY, settings.maxTranslateY);
                this.scale = this.randBetween(settings.minScale, settings.maxScale);
                this.rotateX = Math.random();
                this.rotateY = Math.random();
                this.rotateZ = Math.random();
                this.rotate = 0;
                this.speedRotate = this.randBetween(settings.minRotate, settings.maxRotate);

                var rand = Math.random();
                var color = rand <= .25 ? 'red' : rand <= .5 ? 'blue' : rand <= .75 ? 'green' : 'yellow';

                this.elem.className = 'square ' + color;
                container.appendChild(this.elem);
                this.setTransform();
            }

            Square.prototype.setTransform = function() {
                var transform =
                    'translate3d(' +
                        this.translateX + 'px, ' +
                        this.translateY + 'px, 0) ' +
                    'rotate3d(' +
                        this.rotateX + ', ' +
                        this.rotateY + ', ' +
                        this.rotateZ + ', ' +
                        this.rotate + 'deg)' +
                    'scale(' + this.scale + ')';
                this.elem.style.webkitTransform = transform; /* Chrome 12, Safari 4 */
                this.elem.style.transform = transform;       /* FF 16, IE 10 */
            };

            Square.prototype.randBetween = function(min, max) {
                return Math.random() * (max - min) + min;
            };

            var squares = [];
            for (var i = 0; i < settings.count; i++) {
                squares.push(new Square());
            }
            var lastTime = new Date();
            (function animate() {
                var currentTime = new Date();
                var normalizedSpeed = (currentTime - lastTime) / settings.msDelay;
                var bottomHeight = window.innerHeight + settings.hideHeight;
                for (var i = 0; i < squares.length; i++) {
                    var square = squares[i];
                    square.translateY += square.speedTranslateY * normalizedSpeed;
                    if (square.translateY <= bottomHeight) {
                        square.rotate += square.speedRotate * normalizedSpeed;
                        square.setTransform();
                    } else {
                        container.removeChild(square.elem);
                        squares.splice(i, 1);
                        squares.push(new Square());
                    }
                }
                lastTime = currentTime;
                requestAnimationFrame(animate);
            })();
        }, false);
    }
})();