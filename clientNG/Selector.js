let playerQueries = require('./queries/player.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let originalSelectors = Object.assign({}, playerQueries)
    let curriedSelectors = {}
    
    Object.keys(originalSelectors).forEach(sel => {
        curriedSelectors[sel] = (params) => {
            return originalSelectors[sel](getState(), params)
        }
    })
    return curriedSelectors
}