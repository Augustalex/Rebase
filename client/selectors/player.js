
module.exports = {
    getPlayerWithId(state, clientId) {
        return state.players[clientId]
    },
    getAllPlayers(state) {
        return Object.keys(state.players).map(key => {
            return state.players[key]
        })
    },
    getUserPlayer(state) {
        return state.players[state.user.clientId]
    }
    
}
