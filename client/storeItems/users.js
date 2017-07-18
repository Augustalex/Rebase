
module.exports = {
    actions: {},
    getters: {
        getClientId(state) {
            return state.user.clientId
        }
    },
    setters: {
        setClientId(state, clientId) {
            state.user.clientId = clientId
            return state
        }
    }
}