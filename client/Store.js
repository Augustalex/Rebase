let Selector = require('./Selector.js')
let Setter = require('./Setter.js')
let playerActions = require('./actions/player.js')
let buildingActions = require('./actions/building.js')
let miscActions = require('./actions/misc.js')
let terrainActions = require('./actions/terrain.js')

let allActions = Object.assign({}, playerActions, buildingActions, miscActions, terrainActions)

module.exports = function () {
    let selector = Selector({getState})
    let setter = Setter({getState})
    
    let self = {
        state: {
            players: {},
            user: {},
            houses: {},
            persons: {},
            terrain: {},
        },
        actions: {},
        selector,
        setter,
    }
    
    function getState() {
        return self.state
    }
    
    function setState(newState) {
        self.state = newState
    }
    
    self.actions = {}
    Object.keys(allActions).forEach(action => {
        self.actions[action] = (params) => {
            let state = getState()
            if(!state) throw new Error('State is undefined!')

            setState(allActions[action](state, params, {selector, setter}))
        }
    })
    self.setState = setState
    self.getState = getState
    
    return self
}