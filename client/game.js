let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let socket = io('http://192.168.1.19:8081')


let players = []
let clientId

socket.on('agge', rawData => {
    let data = JSON.parse(rawData)
    
    if(data.command === 'handshake'){
        clientId = data.clientId
    }
    else if(data.command === 'movePlayer'){
        let player = players[data.clientId]
        
        player.rect.x = data.x
        player.rect.y = data.y
    }
    else if(data.command === 'createPlayer'){
        if(!!players[data.clientId]) return
        
        players[data.clientId] = {
            rect: {
                x: data.x,
                y: data.y,
                w: data.w,
                h: data.h
            },
            speed: data.speed,
            color: data.color,
            clientId: data.clientId
        }
    }
    else if(data.command === 'requestPlayer'){
        let player = players[clientId]
        socket.emit('agge', JSON.stringify({
            x: player.rect.x,
            y: player.rect.y,
            w: player.rect.w,
            h: player.rect.h,
            speed: player.speed,
            color: player.color,
            clientId: player.clientId
        }))
    }
})

window.onkeydown = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    let player = players[clientId]
    switch (key) {
        case "w":
            player.rect.y -= player.speed
            break
        case "a":
            player.rect.x -= player.speed
            break
        case "s":
            player.rect.y += player.speed
            break
        case "d":
            player.rect.x += player.speed
            break
        default:
            console.log(key);
    }
    socket.emit('agge', JSON.stringify({
        command: 'movePlayer',
        x: player.rect.x,
        y: player.rect.y
    }))
    if (key === 'CTRL_C') {
        process.exit()
    }
}

function run(state, lastRun) {
    let now = Date.now() / 1000
    let delta = now - lastRun

    setColor(0,0,0)
    clear()

    ctx.font = '15px Arial'
    ctx.fillText('Holy moly', 10, 10);
    
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
