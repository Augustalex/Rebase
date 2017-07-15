let playerSetters = require('./setters/player.js')
let userSetters = require('./setters/user.js')
let buildingSetters = require('./setters/building.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let originalSetters = Object.assign({}, playerSetters, userSetters, buildingSetters)
    let curriedSetters = {}
    Object.keys(originalSetters).forEach(sel => {
        curriedSetters[sel] = (params) => {
            return originalSetters[sel](getState(), params)
        }
    })
    
    return curriedSetters
}