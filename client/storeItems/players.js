let detailsHelper = require('../misc/detailsHelper.js')
let skinToneGenerator = require('../misc/skinToneGenerator.js')
let deepmerge = require('deepmerge')

module.exports = {
    actions: {
        addPlayer(state, player, { setter }){
            return setter.setPlayer(state, player)
        },
        createPlayer(state, { clientId }, { setter }){
            let color = skinToneGenerator.variationOnBase(skinToneGenerator.generate())
            let playerW = 10
            let playerH = 16
            let hatDetails = detailsHelper.createHat(playerW, playerH)
            return setter.setPlayer(state, {
                rect: {
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
    },
    getters: {
        getPlayerWithId(state, clientId) {
            return state.players[clientId]
        },
        getAllPlayers(state) {
            return Object.keys(state.players).map(key => {
                return state.players[key]
            })
        },
        getUserPlayer(state) {
            let player = state.players[state.user.clientId]
            console.log('getUserPlayer' + JSON.stringify(player))
            return player
        }
    },
    setters: {
        setPlayer(state, player) {
            state.players[player.clientId] = player
            return state
        },
        mergePlayer(state, data) {
            let clientId = data.clientId
            let player = state.players[clientId]
            if (!player) {
                throw new Error('player is undefined!')
            }
            state.players[clientId] = deepmerge(player, data)
            return state
        }
    }
}