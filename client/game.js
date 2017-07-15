let Store = require('./client/Store.js')
let Socket = require('./client/Socket.js')
let Dispatcher = require('./client/Dispatcher.js')

let localStore = Store()
let socket = Socket('http://192.168.1.19:8081', {localStore})
let store = Dispatcher({socket}).wrap(localStore)

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let keysPressed = {}

window.onkeydown = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    console.log('key', key)
    keysPressed[key] = true
}

window.onkeyup = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    if (key in keysPressed) {
        delete keysPressed[key]
    }
}

function rand(max){
    return Math.floor(Math.random() * max)
}

function run(state, lastRun) {
    let now = Date.now() / 1000
    let delta = now - lastRun
    
    let clientId = store.selector.getClientId()
    Object.keys(keysPressed).forEach(key => {
        let data = {delta, clientId}
        switch (key) {
            case 'w':
                store.actions.movePlayerUp(data)
                break
            case 'a':
                store.actions.movePlayerLeft(data)
                break
            case 's':
                store.actions.movePlayerDown(data)
                break
            case 'd':
                store.actions.movePlayerRight(data)
                break
            case 'h':
                store.actions.createHouse(data)
                break
            case 'p':
                store.actions.spawnPerson({
                    clientId,
                    personId: `${Math.round(Math.random() * 100000)}`,
                    color: [rand(255), rand(255), rand(255)]
                })
                break
        }
    })
    
    setColor(0, 0, 0)
    clear()
    
    ctx.font = '15px Arial'
    ctx.fillText('Holy moly', 10, 10);
    
    let players = store.selector.getAllPlayers()
    store.selector.getAllHouses().forEach(house => {
        let rect = house.rect
        let color = house.color
        setColor({
            r: color[0],
            g: color[1],
            b: color[2]
        })
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
    
    store.selector.getAllPersons().forEach(person => {
        // if (person.clientId === clientId) {
            let now = Date.now()
            let elapsedTime = now - person.startedWalking
            if (elapsedTime > person.walkTime) {
                store.actions.walkInDirection({
                    clientId,
                    personId: person.id,
                    startedWalking: now,
                    walkTime: Math.round(Math.random() * 10000),
                    direction: Math.random() * Math.PI * 2
                })
                store.actions.adjustPersonPosition({
                    clientId,
                    personId: person.id,
                    position: { x: person.rect.x, y: person.rect.y }
                })
            }
            else{
                person.rect.x += person.speed * delta * Math.cos(person.direction)
                person.rect.y += person.speed * delta * Math.sin(person.direction)
            }
        // }
    
        let rect = person.rect
        let color = person.color
        setColor({
            r: color[0],
            g: color[1],
            b: color[2]
        })
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
    players.forEach(player => {
        let rect = player.rect
        let color = player.color
        setColor({
            r: color[0],
            g: color[1],
            b: color[2]
        })
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
