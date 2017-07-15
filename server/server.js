let app = require('express')()
let http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('port', 8081);

var clientIdCounter = 1
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
            console.log(`sending to ${otherClientId} with data ${message}`)
            const client = clients[otherClientId]
            client.socket.emit("agge", message)
        }
    }
}

io.on('connection', (socket) => {
    const clientId = genClientId();
    clients[clientId] = {
        socket: socket,
    }
    socket.on('command', data => broadcast(clientId, data))
    socket.on('responsePlayer', data => {
        broadcast(clientId, data)
    })
    socket.on('requestPlayer', data => {
        broadcast(clientId, data)
    })

    socket.emit('handshake', clientId)
    console.log(`a user connected: ${socket.handshake.address} that was given this id: ${clientId}`);
    console.log(`sent command handshake ${socket.handshake.address}`)
})

http.listen(8081, '0.0.0.0', () => {
    console.log('listening to 3012');
})

function genPosPart() {
    return Math.round(Math.random() * 1000)
}

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