let app = require('express')()
let http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('port', 8081);

function genColorPart() {
    return Math.round(Math.random() * 255)
}
function genColor() {
    return [
        genColorPart(),
        genColorPart(),
        genColorPart(),
    ]
}

var clientIdCounter = 1;
var clients = {};

function genClientId() {
    const clientId = clientIdCounter
    clientIdCounter++
    return clientId.toString()
}
function broadcast(clientId, message) {
    if(typeof message === "object") {
        message = JSON.stringify(message)
    }
    console.log(`broadcast(${clientId}, ${message})`)
    for(let otherClientId in clients) {
        if(clientId !== otherClientId) {
            console.log(`sending to ${clientId} with data ${message}`)
            const client = clients[otherClientId]
            client.socket.emit("agge", message)
        }
    }
}
function broadcastMove(clientId, data) {
    broadcast(clientId, {
        command: "movePlayer",
        clientId: clientId,
        x: data.x,
        y: data.y,
    })
}
function genPosPart() {
    return Math.round(Math.random() * 1000)
}
function broadcastCreatePlayerData(clientId, data) {
    data = Object.assign({}, data, {
        command: "createPlayer",
    })
    broadcast(null, data)
}
function broadcastCreatePlayer(clientId) {
    broadcastCreatePlayerData(clientId, {
        clientId: clientId,
        w: 10,
        h: 10,
        x: genPosPart(),
        y: genPosPart(),
        speed: 5,
        color: genColor(),
    })
}
function broadcastRequestPlayer(clientId) {
    broadcast(clientId, {
        command: 'requestPlayer',
        clientId: clientId,
    })
}

io.on('connection', (socket) => {
    const clientId = genClientId();
    clients[clientId] = {
        socket: socket,
    }
    socket.on('command', (data) => broadcast(clientId, data))
    socket.on('responsePlayer', (data) => {
        data = JSON.parse(data)
        broadcastCreatePlayerData(data.clientId, data)
    })

    socket.emit("command", JSON.stringify({
        command: "handshake",
        clientId: clientId,
    }))
    console.log('sent command handshake')
    broadcastCreatePlayer(clientId)
    broadcastRequestPlayer(clientId)
    console.log(`a user connected: ${socket.handshake.address} that was given this id: ${clientId}`);
})

http.listen(8081, '0.0.0.0', () => {
    console.log('listening to 3012');
})
