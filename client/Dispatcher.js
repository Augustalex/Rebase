module.exports = function (deps) {
    let socket = deps.socket
    
    return {
        wrap(store) {
            let actions = store.actions
            let wrappedStore = Object.assign({}, store)
            wrappedStore.actions = {}
            Object.keys(actions).forEach(action => {
                wrappedStore.actions[action] = (params) => {
                    socket.sendCommand(action, params)
                    actions[action](params)
                }
            })
            return wrappedStore
        }
    }
}