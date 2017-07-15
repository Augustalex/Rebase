let Selector = require('./Selector.js')
let Setter = require('./Setter.js')
let playerActions = require('./actions/player.js')

let allActions = Object.assign({},
    playerActions,
)

module.exports = function () {
    let selector = Selector({ getState })
    let setter = Setter({ getState })
    
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
    
    self.actions = allActions.map(action => {
        return (params) => {
            setState(actions[action](getState(), params, { selector, setter }))
        }
    }).push(getState, setState)
    
    return self
}