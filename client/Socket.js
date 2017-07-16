module.exports = function (url, deps){
    let store = deps.localStore
    let selector = store.selector
    let setter = store.setter
    
    let socket = io(url)
    
    let wrapActions = true
    let wrapSetters = false
    socket.on('handshake', clientId => {
        setter.setClientId(store.getState(), clientId)
        console.log(`Got handshake: ${clientId}`)
        store.actions.createPlayer({ clientId })
        let player = selector.getUserPlayer()
        console.log(`Created player: ${JSON.stringify(player)}`)

        let command = wrapSetters ? 'setPlayer' : 'addPlayer'
        socket.emit('command', {
            command: command,
            data: player
        })
        console.log('Emitted add player')
    })

    socket.on('command', obj => {
        if(wrapActions){
            if(obj.command === 'addPlayer' && selector.getPlayerWithId(obj.data.clientId)) return
            if(!store.actions[obj.command]){
                console.log('Invalid command.');
                console.log(`Command: ${obj.command} , data: ${obj.data}`);
                return
            }

            store.actions[obj.command](obj.data)
        }
        else if(wrapSetters){
            console.log(`socket on command: ${obj.command}  - ${JSON.stringify(obj.data)}`);
            if(obj.command === 'setPlayer' && selector.getPlayerWithId(obj.data.clientId)) return
            if(!store.setter[obj.command]){
                console.log('Invalid command.');
                console.log(`Command: ${obj.command} , data: ${JSON.stringify(obj.data)}`);
                return
            }
            let currentState = store.getState()
            store.setState(store.setter[obj.command](currentState, obj.data))
        }

    })
    
    return {
        sendCommand
    }
    
    function sendCommand(command, data) {
        let wrappedData = {command, data }
        socket.emit('command', wrappedData)
    }
}