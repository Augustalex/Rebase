
module.exports = {
    addPlayer(state, player, { setter }){
        return setter.setPlayer(state, player)
    },
    createPlayer(state, { clientId }, { setter }){
        return setter.setPlayer(state, {
            rect:{
                x: 50,
                y: 50,
                w: 10,
                h: 10,
            },
            details: [{
                    relX: 0,
                    relY: 2,
                    w: 10,
                    h: 2,
                    color:[0, 170, 170]
                },
                {
                    relX: 0,
                    relY: 4,
                    w: 10,
                    h: 2,
                    color:[0, 255, 0]
                },
                {
                    relX: 0,
                    relY: 6,
                    w: 10,
                    h: 2,
                    color:[170, 170, 0]

                },
                {
                    relX: 0,
                    relY: 8,
                    w: 10,
                    h: 2,
                    color:[255, 0, 0]
                }],
            color:[0, 0, 255],
            speed: 25,
            clientId
        })
    },
    movePlayerUp(state, { clientId, delta, playerPos, playerSpeed }, { setter }) {
        let y = playerPos.y - playerSpeed * delta
        return setter.mergePlayer(state, { clientId, rect: { y } })
    },
    movePlayerDown(state, { clientId, delta, playerPos, playerSpeed }, { setter }) {
        let y = playerPos.y + playerSpeed * delta
        return setter.mergePlayer(state, { clientId, rect: { y } })
    },
    movePlayerLeft(state, { clientId, delta, playerPos, playerSpeed }, { setter }) {
        let x = playerPos.x - playerSpeed * delta
        return setter.mergePlayer(state, { clientId, rect: { x } })
    },
    movePlayerRight(state, { clientId, delta, playerPos, playerSpeed }, { setter }) {
        let x = playerPos.x + playerSpeed * delta
        return setter.mergePlayer(state, { clientId, rect: { x } })
    }
}