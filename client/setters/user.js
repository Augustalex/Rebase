module.exports = {
    setClientId(state, clientId) {
        console.log(`setClientId ${clientId}`)
        state.user.clientId = clientId
        return state
    }
}