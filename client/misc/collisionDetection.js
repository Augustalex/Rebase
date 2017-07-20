
module.exports = {
    inBox
}

function inSpan(a, b, c) {
    return a >= b && a <= c
}

function inBox(point, rect) {
    console.log('point/rect', point, rect);
    return inSpan(point.x, rect.x, rect.x + rect.w) && inSpan(point.y, rect.y, rect.y + rect.h)
}