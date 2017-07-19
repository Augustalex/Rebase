let Selector = require('./Selector.js')
let Setter = require('./Setter.js')

let items = [
    require('./storeItems/players.js'),
    require('./storeItems/users.js'),
    require('./storeItems/houses.js'),
    require('./storeItems/farming/mills.js'),
    require('./storeItems/farming/corn.js'),
    require('./storeItems/persons.js'),
    require('./storeItems/terrain.js')
]
let allActions = {}
items.forEach(o => Object.assign(allActions, o.actions))
let getters = {}
items.forEach(o => Object.assign(getters, o.getters))
let setters = {}
items.forEach(o => Object.assign(setters, o.setters))

module.exports = function () {
    let selector = Selector({getState, getters })
    let setter = Setter({getState, setters })
    
    let self = {
        state: {
            players: {},
            user: {},
            houses: {},
            persons: {},
            terrain: {},
            mills: {},
            corn: {}
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