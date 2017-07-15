let playerSelectors = require('./selectors/player.js')
let userSelectors = require('./selectors/user.js')
let buildingSelectors = require('./selectors/building.js')
let terrainSelectors = require('./selectors/terrain.js')
let miscSelectors = require('./selectors/misc.js')

module.exports = function (deps) {
    let getState = deps.getState
    
    let originalSelectors = Object.assign({},
    	playerSelectors,
    	userSelectors,
    	buildingSelectors,
    	terrainSelectors,
    	miscSelectors)
    let curriedSelectors = {}
    
    Object.keys(originalSelectors).forEach(sel => {
        curriedSelectors[sel] = (params) => {
            return originalSelectors[sel](getState(), params)
        }
    })
    return curriedSelectors
}