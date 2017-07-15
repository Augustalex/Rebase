
module.exports = {
    getPlayerWithId(state, clientId) {
        return state.players[clientId]
    },
    getUserPlayer(state) {
        return state.players[state.user.clientId]
    }
}