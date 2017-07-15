let app = require('express')()
let http = require('http').Server(app)
var io = require('socket.io')(http)

let DEBUG = false

app.set('port', 8081);

let log = []
var clientIdCounter = 1
var clients = {};

function genClientId() {
    const clientId = clientIdCounter
    clientIdCounter++
    return clientId.toString()
}

function broadcast(channel, clientId, message) {
    if (DEBUG) console.log(`broadcast(${channel}, ${clientId}, ${JSON.stringify(message)})`)
    for (let otherClientId in clients) {
        if (clientId !== otherClientId) {
            if (DEBUG) console.log(`sending to ${otherClientId} with data ${JSON.stringify(message)}`)
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
    socket.on('command', data => {
        log.push(data)
        broadcast('command', clientId, data)
    })

    socket.emit('handshake', clientId)
    console.log(`sent command handshake to ${socket.handshake.address} with clientId ${clientId}`)
    log.forEach(l => {
        socket.emit('command', l)
    })
    console.log(`Transmitted all ${log.length} logged commands to player`)
})

http.listen(8081, '0.0.0.0', () => {
    console.log('listening to 3012');
})