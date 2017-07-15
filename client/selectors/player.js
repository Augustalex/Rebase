
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
        let player = state.players[state.user.clientId]
        console.log('getUserPlayer' + JSON.stringify(player))
        return player
    }
    
}
