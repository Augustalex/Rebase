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
    for(var otherClientId in client) {
        if(clientId !== otherClientId) {
            const client = clients[otherClientId]
            client.socket.emit("agge", JSON.stringify(message))
        }
    }
}
function broadcastMove(clientId, data) {
    broadcast(clientId, {
        command: "movePlayer",
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
    broadcastCreatePlayerData({
        clientId: clientId,
        w: 10,
        h: 10,
        x: genPosPart(),
        y: genPosPart(),
        speed: 5,
        color: genColor,
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
    socket.on('agge', data => {
        data = JSON.parse(data)
        switch(data.command) {
            case "move":
                broadcastMove(clientId, data)
                break

            case 'responsePlayer':
                broadcastCreatePlayerData(data.clientId, data)
                break
        }
    })
    socket.emit("agge", JSON.stringify({
        command: "handshake",
        clientId: clientId,
    }))
    broadcastCreatePlayer(clientId)
    broadcaseRequestPlayer(clientId)
    console.log(`a user connected: ${socket.handshake.address} that was given this id: ${clientId}`);
})

http.listen(8081, '0.0.0.0', () => {
    console.log('listening to 3012');
})
