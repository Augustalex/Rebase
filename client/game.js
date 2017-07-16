let Logic = require('./client/logic/Logic.js')
let Store = require('./client/Store.js')
let Socket = require('./client/Socket.js')
let Dispatcher = require('./client/Dispatcher.js')

let localStore = Store()
let socket = Socket('http://192.168.1.19:8081', { localStore })
// let socket = Socket('http://192.168.1.21:8081', {localStore})
// let socket = Socket('http://127.0.0.1:8081', {localStore})
let store = Dispatcher({ socket }).wrapActions(localStore)
// let store = Dispatcher({ socket }).wrapSetters(localStore)

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let keysPressed = {}

window.onkeydown = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    keysPressed[key] = true
}

window.onkeyup = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    if (key in keysPressed) {
        delete keysPressed[key]
    }
}

let core = Logic({
    store,
    localStore,
    keysPressed,
    ctx,
})

function run(state, lastRun) {
    let now = Date.now() / 1000
    let delta = now - lastRun

    core.run(delta)
    core.draw()

    ctx.font = '15px Arial'
    ctx.fillText('Holy moly', 10, 10);

    requestAnimationFrame(() => run(state, now))
}

function inSpan(a, b, c) {
    return a >= b && a <= c
}

function inBox(point, rect) {
    return inSpan(point.x, rect.x, rect.x + rect.w) && inSpan(point.y, rect.y, rect.y + rect.h)
}

requestAnimationFrame(() => run({}, Date.now() / 1000))
