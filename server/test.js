let app = require('express')()
let http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('port', 8080);

let clients = Set()

io.on('connection', (socket) => {
    clients.add(socket.handshake.address)
    socket.on('agge', data => {
        console.log(`Got data on channel "agge": ${data}`);
        socket.emit('agge', data);
    })
    console.log('a user connected');
})

http.listen(8080, '0.0.0.0', () => {
    console.log('listening to 3012');
})
