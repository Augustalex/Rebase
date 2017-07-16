let detailsHelper = require('../misc/detailsHelper.js')

module.exports = {
    addPlayer(state, player, { setter }){
        return setter.setPlayer(state, player)
    },
    createPlayer(state, { clientId }, { setter }){
        let playerW = 10
        let playerH = 16
        let hatDetails = detailsHelper.createHat(playerW, playerH)
        console.log(hatDetails);
        return setter.setPlayer(state, {
            rect:{
                x: 50,
                y: 50,
                w: playerW,
                h: playerH,
            },
            details: hatDetails,
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