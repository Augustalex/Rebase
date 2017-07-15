module.exports = function (url, deps){
    let store = deps.localStore
    let selector = store.selector
    let setter = store.setter
    
    let socket = io(url)
    
    socket.on('handshake', clientId => {
        setter.setClientId(store.getState(), clientId)
        console.log(`Got handshake: ${clientId}`)
        store.actions.createPlayer({ clientId })
        let player = selector.getUserPlayer()
        console.log(`Created player: ${JSON.stringify(player)}`)

        socket.emit('command', {
            command: 'addPlayer',
            data: player
        })
        console.log('Emitted add player')
    })
    
    socket.on('command', obj => {
        if(obj.command === 'addPlayer' && selector.getPlayerWithId(obj.data.clientId)) return
        
        store.actions[obj.command](obj.data)
    })
    
    return {
        sendCommand
    }
    
    function sendCommand(command, data) {
        let wrappedData = {command, data }
        socket.emit('command', wrappedData)
    }
}