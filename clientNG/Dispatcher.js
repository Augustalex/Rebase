module.exports = function (deps) {
    let socket = deps.socket
    
    return {
        wrap(store) {
            let actions = store.actions
            store.actions = {}
            
            Object.keys(actions).forEach(action => {
                store.actions[action] = (params) => {
                    socket.sendCommand(action, params)
                    actions[action](params)
                }
            })
        }
    }
}