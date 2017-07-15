let playerSelectors = require('./selectors/player.js')
let userSelectors = require('./selectors/user.js')
let buildingSelectors = require('./selectors/building')

module.exports = function (deps) {
    let getState = deps.getState
    
    let originalSelectors = Object.assign({}, playerSelectors, userSelectors, buildingSelectors)
    let curriedSelectors = {}
    
    Object.keys(originalSelectors).forEach(sel => {
        curriedSelectors[sel] = (params) => {
            return originalSelectors[sel](getState(), params)
        }
    })
    return curriedSelectors
}