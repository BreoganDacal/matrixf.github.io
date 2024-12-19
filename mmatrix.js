function generateFibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
}

// Generar la secuencia de Fibonacci hasta 25 elementos
var textStrip = generateFibonacci(25);

// cache window size, reduce DOM access
var winHeight = $(window).height();
var winWidth = $(window).width();

var matrixcol = function() {
    var top = Math.floor(Math.random() * winHeight * 0.5);
    var size = 10 + Math.floor(Math.random() * 10);
    var col = Math.floor(Math.random() * winWidth - size);
    var ms = 500 + Math.floor(Math.random() * 1500);

    // make container so DOM clean up is less frequent
    var $container = $("<div class='container' style='font-size:" + size + "px;top:" + top + "px; left:" + col + "px;'></div>");
    $container.appendTo(document.body)

    // flag variable for waiting last animation in the container
    // or DOM will be larger and larger
    var waitForLastAnimationEnd = false;

    var aap = function() {
        // do nothing until last anim has ended
        if (waitForLastAnimationEnd) return requestAnimationFrame(aap);

        var randomNumber = Math.floor(Math.random() * textStrip.length);

        var newelem = $("<div style='animation-duration:" + 2 * ms + "ms'>" + textStrip[randomNumber] + "</div>");
        $container.append(newelem);
        top += size;
        if (top > winHeight - size) {
            size = 10 + Math.floor(Math.random() * 10);
            top = Math.floor(Math.random() * winHeight * 0.5);
            col = Math.floor(Math.random() * winWidth - size);
            ms = 300 + Math.floor(Math.random() * 1500);
            // await animationend
            newelem.on('animationend', function() {
                $container.remove();
                $container = $("<div class='container' style='font-size:" + size + "px;top:" + top + "px; left:" + col + "px;'></div>");
                $container.appendTo(document.body);
                // notify the animation to start
                waitForLastAnimationEnd = false;
            });
            // flag variable
            waitForLastAnimationEnd = true;
        }
        // recurse
        requestAnimationFrame(aap);
    };
    // for better perf
    requestAnimationFrame(aap);
};

$(document).ready(function() {
    var i;
    for (i = 0; i < 25; i++) {
        matrixcol();
    }
});
