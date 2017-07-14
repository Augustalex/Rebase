let app = require('express')()
let http = require('http').Server(app)

app.get('/',  (req, res) => {
    res.send('hello')
})

http.listen(3012, () => {
    console.log('listening to 3012');
})