module.exports = {
    setClientId(state, clientId) {
        state.user.clientId = clientId
        return state
    }
}