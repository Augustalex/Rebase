module.exports = {
    setPlayer(state, player) {
        state.players[player.clientId] = player
        return state
    }
}