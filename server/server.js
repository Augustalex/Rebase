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

function broadcast(channel, clientId, message) {
    console.log(`broadcast(${channel}, ${clientId}, ${JSON.stringify(message)})`)
    for(let otherClientId in clients) {
        if(clientId !== otherClientId) {
            console.log(`sending to ${otherClientId} with data ${JSON.stringify(message)}`)
            const client = clients[otherClientId]
            client.socket.emit(channel, message)
        }
    }
}

io.on('connection', (socket) => {
    const clientId = genClientId();
    clients[clientId] = {
        socket: socket,
    }
    socket.on('command', data => broadcast('command', clientId, data))
    socket.on('requestPlayer', data => {
        broadcast('requestPlayer', clientId, data)
    })

    socket.emit('handshake', clientId)
    console.log(`sent command handshake to ${socket.handshake.address} with clientId ${clientId}`)
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