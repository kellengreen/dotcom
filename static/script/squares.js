 /*
 * Name: Squares Background
 * Author: Kellen Green
 * Date: 12/16/2014
 * Version: 2.0
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

        function randFloatBetween(min, max) {
            return Math.random() * (max - min) + min;
        }

        function randIntBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var container = document.querySelector('#squares'),
            count = Math.round(window.innerWidth / 12),
            hideHeight = 30,
            minScale = .5,
            maxScale = 1,
            minRotate = 500,
            maxRotate = 1000,
            minDuration = 6,
            maxDuration = 20,
            colors = ['red', 'blue', 'green', 'yellow'];

        for (var i = 0; i < count; i++) {

            var elem = document.createElement('div'),
                translateX = window.innerWidth * Math.random(),
                translateYStart = -hideHeight,
                translateYEnd =  window.innerHeight + hideHeight,
                rotateX = Math.random(),
                rotateY = Math.random(),
                rotateZ = Math.random(),
                rotateA = randIntBetween(minRotate, maxRotate),
                scale = randFloatBetween(minScale, maxScale),
                duration = randFloatBetween(minDuration, maxDuration) * 1000,
                color = colors[randIntBetween(0, 3)],
                startTransform = 'translate3d(' + translateX + 'px, ' + translateYStart + 'px, 0) ' +
                    'rotate3d(0, 0, 0, 0deg)' +
                    'scale(' + scale + ')',
                endTransform = 'translate3d(' + translateX + 'px, ' + translateYEnd + 'px, 0) ' +
                    'rotate3d(' + rotateX + ',' + rotateY + ',' + rotateZ + ', ' + rotateA + 'deg)' +
                    'scale(' + scale + ')';

            elem.classList.add('square');
            elem.classList.add(color);
            elem.animate([
                {transform: startTransform},
                {transform: endTransform}
            ], {
                duration: duration,
                iterations: Infinity
            });
            container.appendChild(elem);
        }
    });

})();