let DEBUG = process.env.DEBUG_ON

module.exports = {
    prefix: 'socket:',
    handshake,
    movePlayer,
    createPlayer,
    requestPlayer
}

function handshake(state, { clientId }){
    if(DEBUG) console.log(`handshake: (clientId ${clientId})`)
    
    state.user.clientId = clientId
    
    return state
}

function movePlayer(state, { x, y }){
    if(DEBUG) console.log(`movePlayer: (x:${x}, y:${y})`)
    
    let player = state.players[data.clientId]
    if(!player) console.log(`Could not find any player with ID: ${data.clientId}`)
    
    player.rect.x = data.x
    player.rect.y = data.y
    
    return state
}

function createPlayer(state, data) {
    if(DEBUG) console.log(`createPlayer: ${JSON.stringify(data)}`)
    if(!!state.players[data.clientId]) return
    
    state.players[data.clientId] = {
        rect: {
            x: data.x,
            y: data.y,
            w: data.w,
            h: data.h
        },
        speed: data.speed,
        color: data.color,
        clientId: data.clientId
    }
    
    return state
}

function requestPlayer(state, data, { socket }) {
    if(DEBUG) console.log(`requestPlayer ${JSON.stringify(data)}`)
    let player = state.players[state.user.clientId]
    socket.emit('agge', JSON.stringify({
        command: 'responsePlayer',
        x: player.rect.x,
        y: player.rect.y,
        w: player.rect.w,
        h: player.rect.h,
        speed: player.speed,
        color: player.color,
        clientId: player.clientId
    }))
    
    return state
}
