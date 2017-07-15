
module.exports = {
    addPlayer(state, player, { selector, setter }){
        return setter.setPlayer(state, player)
    },
    createPlayer(state, { clientId }, { selector, setter }){
        return setter.setPlayer(state, {
            rect:{
                x: 50,
                y: 50,
                w: 10,
                h: 10,
            },
            details: [{
                relX: 0,
                relY: 8,
                w: 10,
                h: 2,
                color:[0, 0, 0]
            }],
            color:[255, 0, 0],
            speed: 20,
            clientId
        })
    },
    movePlayerUp(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.y -= player.speed * delta
        return setter.setPlayer(state, player)
    },
    movePlayerDown(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.y += player.speed * delta
        return setter.setPlayer(state, player)
    },
    movePlayerLeft(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.x -= player.speed * delta
        return setter.setPlayer(state, player)
    },
    movePlayerRight(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.x += player.speed * delta
        return setter.setPlayer(state, player)
    }
}