let queries = {
    players(state) {
        return state.players
    },
    userClientId(state) {
        if (!state.user) console.log('Query[userClientId] No user in state')
        else return state.user.clientId
    },
    userPlayer(state) {
        if (!state.players) console.log('Query[userPlayer] No players in state')
        else return state.players[queries.userClientId(state)]
    }
}

module.exports = function (stateWrapper) {
    let wrappedQueries = Object.assign({}, queries)
    Object.keys(wrappedQueries).forEach(key => {
        let originalQuery = wrappedQueries[key]
        wrappedQueries[key] = () => {}
        //If the function takes only state as parameter then wrap as a getter
        if(originalQuery[key].length === 1){
            Object.defineProperty(wrappedQueries, key, {
                get: function () {
                    return originalQuery(stateWrapper.state)
                }
            })
        }
        else{ //Else wrap it in a lambda that only takes all parameters but state
            wrappedQueries[key] = (...params) => originalQuery[key](stateWrapper.state, ...params)
        }
    })
    
    return wrappedQueries
}
