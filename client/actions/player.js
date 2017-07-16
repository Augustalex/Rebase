let detailsHelper = require('../misc/detailsHelper.js')
let skinToneGenerator = require('../misc/skinToneGenerator.js')

module.exports = {
    addPlayer(state, player, { setter }){
        return setter.setPlayer(state, player)
    },
    createPlayer(state, { clientId }, { setter }){
        let color = skinToneGenerator.variationOnBase(skinToneGenerator.generate())
        let playerW = 10
        let playerH = 16
        let hatDetails = detailsHelper.createHat(playerW, playerH)
        return setter.setPlayer(state, {
            rect:{
                x: 1000,
                y: 1000,
                w: playerW,
                h: playerH,
            },
            details: hatDetails,
            color,
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