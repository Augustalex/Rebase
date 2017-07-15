
module.exports = function (deps) {
    let socket = deps.socket
    
    return {
        wrap(store) {
            let actions = store.actions
            store.actions = actions.map(action => {
                return (params) => {
                    socket.sendCommand(action, params)
                    actions[action](params)
                }
            })
        }
    }
}