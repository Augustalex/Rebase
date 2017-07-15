
module.exports = {
    movePlayerUp(state, { delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(state.user.clientId)
        player.rect.y -= player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerDown(state, { delta }) {
        let player = selector.getPlayerWithId(state.user.clientId)
        player.y += player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerLeft(state, { delta }, { selector, setter }) {
        let player = selector.getPlayerWithId(state.user.clientId)
        player.rect.x -= player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerRight(state, { delta }) {
        let player = selector.getPlayerWithId(state.user.clientId)
        player.x += player.speed * delta
        return setter.setPlayer(player)
    }
}