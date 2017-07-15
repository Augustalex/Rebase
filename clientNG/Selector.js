let playerQueries = require('./queries/player.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let selectors = Object.assign({},
        playerQueries,
    )
    
    return selectors.map(sel => {
        return (params) => {
            return selectors[sel](getState(), params)
        }
    })
}