let Selector = require('./Selector.js')
let Setter = require('./Setter.js')
let playerActions = require('./actions/player.js')

let allActions = Object.assign({}, playerActions)

module.exports = function () {
    let selector = Selector({getState})
    let setter = Setter({getState})
    
    let self = {
        state: {},
        actions: {},
        selector
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
            setState(actions[action](getState(), params, {selector, setter}))
        }
    })
    self.actions.setState = setState
    self.actions.getState = getState
    
    return self
}