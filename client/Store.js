let Selector = require('./Selector.js')
let Setter = require('./Setter.js')
let playerActions = require('./actions/player.js')
let buildingActions = require('./actions/building.js')

let allActions = Object.assign({}, playerActions, buildingActions)

module.exports = function () {
    let selector = Selector({getState})
    let setter = Setter({getState})
    
    let self = {
        state: {
            players: {},
            user: {}
        },
        actions: {},
        selector,
        setter
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
            setState(allActions[action](getState(), params, {selector, setter}))
        }
    })
    self.actions.setState = setState
    self.actions.getState = getState
    
    return self
}