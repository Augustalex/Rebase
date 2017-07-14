let app = require('express')()
let http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('port', 8081);

let clients = new Set()

let colors = [
    [255,0,0],
    [0,255,0],
    [0,0,255]
]

io.on('connection', (socket) => {
    clients.add(socket)
    let color = colors.pop()
    colors.unshift(color)
    socket.on('agge', data => {
        console.log(`Got data on channel "agge": ${data}`);
        clients.forEach(client => {
            if(client === socket) return
            
            let newData = {
                rect: JSON.parse(data),
                color
            }
            client.emit('agge', JSON.stringify(newData))
        })
    })
    console.log(`a user connected: ${socket.handshake.address}`);
})

http.listen(8081, '0.0.0.0', () => {
    console.log('listening to 3012');
})
