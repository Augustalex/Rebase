let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let socket = io('http://192.168.1.19:8081')

let dudad = {
    rect: {
        x: 10,
        y: 10,
        w: 5,
        h: 5
    },
    speed: 5
}

window.onkeydown = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    switch (key) {
        case "w":
            dudad.rect.y -= dudad.speed
            break
        case "a":
            dudad.rect.x -= dudad.speed
            break
        case "s":
            dudad.rect.y += dudad.speed
            break
        case "d":
            dudad.rect.x += dudad.speed
            break
        default:
            console.log(key);
    }
    socket.emit('agge', JSON.stringify(dudad.rect))
    if (key === 'CTRL_C') {
        process.exit()
    }
}

let orders = []

socket.on('agge', data => {
    orders.push(JSON.parse(data))
})

function run(state, lastRun) {
    let now = Date.now() / 1000
    let delta = now - lastRun

    setColor(0,0,0)
    // clear()

    ctx.font = '15px Arial'
    ctx.fillText('Holy moly', 10, 10);

    setColor(255,0,0)
    ctx.fillRect(dudad.rect.x, dudad.rect.y, dudad.rect.w, dudad.rect.h)
    
    orders.forEach(o => {
        let rect = o.rect
        let color = o.color
        console.log('order', JSON.stringify(o))
        setColor({
            r: color[0],
            g: color[1],
            b: color[2]
        })
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
    })
    orders = []

    requestAnimationFrame(() => run(state, now))
}

function setColor({ r, g, b }){
    ctx.fillStyle = `rgb(${r},${g},${b})`
}

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function inSpan(a, b, c) {
    return a >= b && a <= c
}

function inBox(point, rect) {
    return inSpan(point.x, rect.x, rect.x + rect.w) && inSpan(point.y, rect.y, rect.y + rect.h)
}

requestAnimationFrame(() => run({}, Date.now() / 1000))
