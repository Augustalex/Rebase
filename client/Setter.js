let playerSetters = require('./setters/player.js')
let userSetters = require('./setters/user.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let originalSetters = Object.assign({}, playerSetters, userSetters)
    let curriedSetters = {}
    Object.keys(originalSetters).forEach(sel => {
        curriedSetters[sel] = (params) => {
            return originalSetters[sel](getState(), params)
        }
    })
    
    return curriedSetters
}