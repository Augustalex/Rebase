
module.exports = {
    addPlayer(state, player, { selector, setter }){
        return setter.setPlayer(player)
    },
    createPlayer(state, { clientId }, { selector, setter }){
        return setter.setPlayer({
            rect:{
                x: 50,
                y: 50,
                w: 10,
                h: 10
            },
            color:[255, 0, 0],
            speed: 20,
            clientId
        })
    },
    movePlayerUp(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.y -= player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerDown(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.y += player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerLeft(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.x -= player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerRight(state, { clientId, delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(clientId)
        player.rect.x += player.speed * delta
        return setter.setPlayer(player)
    }
}