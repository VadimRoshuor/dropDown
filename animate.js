function animate(el, property, value, duration, onEnded) {
    var fps = 60;
    var frameTime = 1000 / fps;
    var framesCount = duration / frameTime;
    var elapsedTime = 0;
    var final = value;
    value = parseFloat(value) -
        parseFloat(el.style[property] ||
            window.getComputedStyle(el)[property]);

    el.__animationInterval = setInterval(function () {
        var current = el.style[property] ||
            window.getComputedStyle(el)[property];

        var step = value / framesCount;

        el.style[property] = parseFloat(current) +
            step + "px";
        elapsedTime += frameTime;

        if (elapsedTime >= duration) {
            el.style[property] = final + "px";
            clearInterval(el.__animationInterval)

            onEnded && onEnded()
        }

    }, frameTime);
}
function stopAnimation(el){
    clearInterval(el.__animationInterval)
}