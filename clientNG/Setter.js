let playerSetters = require('./setters/player.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let setters = Object.assign({},
        playerSetters,
    )
    
    return setters.map(sel => {
        return (params) => {
            return setters[sel](getState(), params)
        }
    })
}