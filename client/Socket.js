module.exports = function (url, deps){
    let store = deps.store
    let selector = store.selector
    let setter = store.setter
    
    let socket = io(url)
    
    socket.on('handshake', clientId => {
        setter.setClientId(clientId)
        store.actions.createPlayer({ clientId })
        socket.emit('command', {
            command: 'createPlayer',
            data: clientId
        })
        socket.emit('requestPlayer')
    })
    
    socket.on('command', (json) => {
        let obj = JSON.parse(json)
        store.actions[obj.command](obj.data)
    })
    
    socket.on('requestPlayer', () => {
        let player = selector.getUserPlayer()
        socket.emit('responsePlayer', player)
    })
    
    socket.on('responsePlayer', player => {
        store.actions.createPlayer(player)
    })
    
    return {
        sendCommand
    }
    
    function sendCommand(command, data) {
        let wrappedData = {command, data }
        socket.emit(command, wrappedData)
    }
}