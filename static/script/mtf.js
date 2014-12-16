// OLD FRAMEWORK IDEAS
/*
 * MTF (My Tiny Framework)
 * Author: Kellen Green
 * Version: 13/5/11
 */

(function() {

    /* MAIN FRAMEWORK */
    function Main() {
    }

    Main.prototype.ready = function(func) {
        document.addEventListener('DOMContentLoaded', func, false);
    }

    Main.prototype.debug = function(val) {
        console.log(val);
    }

    Main.prototype.get = function(selector) {
        return new Elems(document.querySelectorAll(selector));
    }

    Main.prototype.id = function(id) {
        return document.getElementById(id);
    }

    Main.prototype.resize = function(func) {
        var resize = new Resize(func);
        window.addEventListener('resize', function() {
            resize.changed = true;
            if (resize.running === false) {
                resize.draw();
            }
        }, false);
    }

    Main.prototype.raf = (function() {
        return window.requestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.webkitRequestAnimationFrame;
    })();

    /* RESIZE */
    function Resize(func) {
        this.changed = false;
        this.running = false;
        this.func = func;
    }

    Resize.prototype.draw = function() {
        if (this.changed === true) {
            this.changed = false;
            this.running = true;
            this.func();
            var instance = this;
            raf(function() {
                instance.draw();
            });
        } else {
            this.running = false;
        }
    }

    var raf = window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame;

    /*
    var resize = (function() {
        var private_property = 0,
            private_method = function () {
                console.log('This is private');
            }

        return {
            prop: 1,
            another_prop: 'value',
            method: function() {
                private_method();
                return private_property;
            },
            another_method: function() {…}
        }
    }());
    */

    /* ELEMENTS */
    function Elems(nodeList) {
        this.elems = nodeList;
    }

    Elems.prototype.first = function(func) {
        if (this.elems.length > 0) {
            func(this.elems[0]);
        }
        return this;
    }

    Elems.prototype.each = function(func) {
        if (this.elems.length > 0) {
            for (var i=0; i < this.elems.length; i++) {
                func(this.elems[i]);
            }
        }
        return this;
    }

    /* ELEMENT */
    function Elem() {

    }

    Elem.prototype.addClass = function() {

    }

    /* PRIVATE */


    window.mtf = new Main();
})();

mtf.get('.box').first(function(elem) {
    elem.style.marginLeft = '-' + (elem.offsetWidth / 2).toString() + 'px';
    elem.style.marginTop = '-' + (elem.offsetHeight / 2).toString() + 'px';
});

mtf.resize(function() {
    mtf.get('.box').first(function(elem) {
        elem.style.marginLeft = '-' + (elem.offsetWidth / 2).toString() + 'px';
        elem.style.marginTop = '-' + (elem.offsetHeight / 2).toString() + 'px';
    });
});

function center(elem) {
    elem.style.marginLeft = '-' + (elem.offsetWidth / 2).toString() + 'px';
    elem.style.marginTop = '-' + (elem.offsetHeight / 2).toString() + 'px';
}

/*
<!--
<div class="modal ayitl">
    <div class="box">
        <div class="close"><span class="icon-cancel-circle"></span></div>
        <div class="content video">
            <video controls>
                <source src="/static/videos/ayitl.mp4" type="video/mp4">
                our browser does not support the video tag.
            </video>
        </div>
    </div>
</div>

<div class="template ayitl modal">
    <video controls>
        <source src="/static/videos/ayitl.mp4" type="video/mp4">
        <p>Your browser does not support the video tag.</p>
    </video>
</div>
-->

@media screen and (min-aspect-ratio: 1280/720) {
  .ayitl video {
      width: auto;
      height: 100%;
  }
  .modal .box {
      width: auto;
      height: 80%;
  }
}
@media screen and (max-aspect-ratio: 1280/720) {
  .ayitl video {
      width: 100%;
      height: auto;
  }
  .modal .box {
      width: 80%;
      height: auto;
  }
}

.modal .box .close {
    text-align: right;
}
.modal .box .close span:hover {
    color: hsl(0, 59%, 57%);
    cursor: pointer;
}
.modal .box .content {

}
.modal .box .content.video { line-height: 0 }

.modal {
    position: absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,.75);
    width: 100%;
    height: 100%;
}
.modal .box {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 0 10px 10px 10px;
    border-radius: 10px;
    background-color: #FFF;
    color: #000;
}


 */
