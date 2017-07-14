let app = require('express')()
let http = require('http').Server(app)

app.get('/',  (req, res) => {
    res.send('hello')
})

http.listen(8081, '0.0.0.0', () => {
    console.log('listening to 3012');
})