let playerSelectors = require('./selectors/player.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let originalSelectors = Object.assign({}, playerSelectors)
    let curriedSelectors = {}
    
    Object.keys(originalSelectors).forEach(sel => {
        curriedSelectors[sel] = (params) => {
            return originalSelectors[sel](getState(), params)
        }
    })
    return curriedSelectors
}