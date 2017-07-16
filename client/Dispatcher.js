module.exports = function (deps) {
    let socket = deps.socket

    return {
        wrapActions(store) {
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
        },
        wrapSetters(store) {
            let setters = store.setter
            let wrappedStore = Object.assign({}, store)
            wrappedStore.setter = {}
            Object.keys(setters).forEach(setter => {
                console.log(`Wrapped setter: ${setter}`);
                wrappedStore.setter[setter] = (params) => {
                    socket.sendCommand(setter, params)
                    console.log('Dispatch state: ' + setter);
                    let currentState = wrappedState.getState()
                    wrappedStore.setState(setters[setter](currentState, params))
                }
            })
            return wrappedStore

        }
    }
}