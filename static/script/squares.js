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
            count = Math.round(window.innerWidth / 15),
            hideHeight = 30,
            minScale = .5,
            maxScale = 1,
            minRotate = 1,
            maxRotate = 1080,
            minDuratrion = 5,
            maxDuration = 10,
            colors = ['red', 'blue', 'green', 'yellow'];

        for (var i = 0; i < count; i++) {

            var elem = document.createElement('div');
            elem.className = 'square ' + colors[randIntBetween(0, 3)];

            var translateX = window.innerWidth * Math.random();
            var translateYStart = -hideHeight;
            var translateYEnd =  window.innerHeight + hideHeight;
            var rotateStart = randIntBetween(minRotate, maxRotate);
            var rotateEnd = randIntBetween(minRotate, maxRotate);
            var scale = randFloatBetween(minScale, maxScale);
            var duration = randFloatBetween(minDuratrion, maxDuration) * 1000;

            var startTransform =
                'translate3d(' + translateX + 'px, ' + translateYStart + 'px, 0) ' +
                'rotate3d(1, 1, 1, ' + rotateStart + 'deg)' +
                'scale(' + scale + ')';

            var endTransform =
                'translate3d(' + translateX + 'px, ' + translateYEnd + 'px, 0) ' +
                'rotate3d(1, 1, 1, ' + rotateEnd + 'deg)' +
                'scale(' + scale + ')';

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