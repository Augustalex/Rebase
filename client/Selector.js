module.exports = function (deps) {
    let getState = deps.getState
    let getters = deps.getters

    let curriedSelectors = {}
    Object.keys(getters).forEach(sel => {
        curriedSelectors[sel] = (params) => {
            let state = getState();
            if(!state) throw new Error('State is undefined!')
            return getters[sel](state, params)
        }
    })
    return curriedSelectors
}