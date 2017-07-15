module.exports = function (url, deps){
    let reducers = deps.reducers
    let selector = deps.selector
    
    let socket = io(url)
    
    socket.on("command", (rawData) => {
        let data = JSON.parse(rawData)
        reducers[data.command](data)
    })
    
    socket.on('requestPlayer', () => {
        let player = selector.getUserPlayer()
        socket.emit('responsePlayer', player)
    })
    
    socket.on('responsePlayer', player => {
        reducers.createPlayer(player)
    })
    
    return {
        sendCommand
    }
    
    function sendCommand(command, data) {
        let wrappedData = {command, data }
        socket.emit(command, wrappedData)
    }
}