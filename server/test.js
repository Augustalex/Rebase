let app = require('express')()
let http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('port', 8080);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/server/clientTest.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
})

http.listen(8080, '0.0.0.0', () => {
    console.log('listening to 3012');
})
