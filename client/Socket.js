module.exports = function (url, deps){
    let store = deps.localStore
    let selector = store.selector
    let setter = store.setter
    
    let socket = io(url)
    
    socket.on('handshake', clientId => {
        console.log('store', store)
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
        socket.emit('requestPlayer')
        console.log('Emitted request player')
    })
    
    socket.on('command', obj => {
        // console.log(`Got command with: ${JSON.stringify(obj)}`)
        if(obj.command === 'addPlayer' && selector.getPlayerWithId(obj.data.clientId)) return
        
        store.actions[obj.command](obj.data)
    })
    
    socket.on('requestPlayer', () => {
        console.log('Got request player')
        let player = selector.getUserPlayer()
        socket.emit('command', {
            command: 'addPlayer',
            data: player
        })
        console.log(`Emitted addPlayer: ${JSON.stringify(player)}`)
    })
    
    return {
        sendCommand
    }
    
    function sendCommand(command, data) {
        let wrappedData = {command, data }
        socket.emit('command', wrappedData)
    }
}