let Store = require('./clientNG/Store.js')
let Socket = require('./clientNG/Socket.js')
let Dispatcher = require('./clientNG/Dispatcher.js')

let store = Store()
let socket = Socket('http://192.168.1.19:8081', store)
Dispatcher({ socket }).wrap(store)

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let keysPressed = {}

window.onkeydown = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    keysPressed[key] = true
}

window.onkeyup = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    if(key in keysPressed){
        delete keysPressed[key]
    }
}

function run(state, lastRun) {
    let now = Date.now() / 1000
    let delta = now - lastRun
    
    Object.keys(keysPressed).forEach(key => {
        switch (key) {
            case 'W':
                store.actions.movePlayerUp({ delta })
            break
        }
    })
    
    setColor(0, 0, 0)
    clear()
    
    ctx.font = '15px Arial'
    ctx.fillText('Holy moly', 10, 10);
    
    console.log(store.selector.getAllPlayers())
    let players = store.selector.getAllPlayers()
    players.forEach(player => {
        let rect = player.rect
        let color = player.color
        setColor({
            r: color[0],
            g: color[1],
            b: color[2]
        })
        console.log(`Player ${player.clientId}: rect${JSON.stringify(rect)}`)
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
    
    requestAnimationFrame(() => run(state, now))
}

function setColor({r, g, b}) {
    ctx.fillStyle = `rgb(${r},${g},${b})`
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function inSpan(a, b, c) {
    return a >= b && a <= c
}

function inBox(point, rect) {
    return inSpan(point.x, rect.x, rect.x + rect.w) && inSpan(point.y, rect.y, rect.y + rect.h)
}

requestAnimationFrame(() => run({}, Date.now() / 1000))
