let deepmerge = require('deepmerge')

module.exports = {
    setPlayer(state, player) {
        state.players[player.clientId] = player
        return state
    },
    mergePlayer(state, data) {
        let clientId = data.clientId
        let player = state.players[clientId]
        if(!player){
            throw new Error('player is undefined!')
        }
        state.players[clientId] = deepmerge(player, data)
        return state
    }
}