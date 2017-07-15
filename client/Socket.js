module.exports = function (url, deps){
    let store = deps.localStore
    console.log(store)
    let selector = store.selector
    let setter = store.setter
    
    let socket = io(url)
    
    socket.on('handshake', clientId => {
        setter.setClientId(clientId)
        store.actions.createPlayer({ clientId })
        let player = selector.getUserPlayer()
        socket.emit('command', {
            command: 'addPlayer',
            data: player
        })
        socket.emit('requestPlayer')
    })
    
    socket.on('command', (json) => {
        let obj = JSON.parse(json)
        if(obj.command === 'addPlayer' && selector.getPlayerWithId(obj.data.clientId)) return
        
        store.actions[obj.command](obj.data)
    })
    
    socket.on('requestPlayer', () => {
        let player = selector.getUserPlayer()
        socket.emit('addPlayer', player)
    })
    
    return {
        sendCommand
    }
    
    function sendCommand(command, data) {
        let wrappedData = {command, data }
        socket.emit(command, wrappedData)
    }
}