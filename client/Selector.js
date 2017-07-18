let storeItems = [
    require('./storeItems/users.js'),
    require('./storeItems/players.js'),
    require('./storeItems/persons.js'),
    require('./storeItems/buildings.js'),
    require('./storeItems/terrain.js')
]

module.exports = function (deps) {
    let getState = deps.getState

    let originalSelectors = {}
    for(let item of storeItems){
        Object.assign(originalSelectors, item.getters)
    }
    let curriedSelectors = {}
    
    Object.keys(originalSelectors).forEach(sel => {
        curriedSelectors[sel] = (params) => {
            let state = getState();
            if(!state) throw new Error('State is undefined!')
            return originalSelectors[sel](state, params)
        }
    })
    return curriedSelectors
}