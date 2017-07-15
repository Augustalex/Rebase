
module.exports = {
    getPlayerWithId(state, clientId) {
        return state.players[clientId]
    },
    getAllPlayers(state) {
        console.log(state)
        return state.players
    },
    getUserPlayer(state) {
        return state.players[state.user.clientId]
    }
}
