
module.exports = {
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
    movePlayerUp(state, { delta }, { selector, setter }) {
        let player = selector.getUserPlayer()
        player.rect.y -= player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerDown(state, { delta }, { selector, setter }) {
        let player = selector.getUserPlayer()
        player.rect.y += player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerLeft(state, { delta }, { selector, setter }) {
        let player = selector.getUserPlayer()
        player.rect.x -= player.speed * delta
        return setter.setPlayer(player)
    },
    movePlayerRight(state, { delta }, { selector, setter }) {
        let player = selector.getUserPlayer()
        player.rect.x += player.speed * delta
        return setter.setPlayer(player)
    }
}