module.exports = {
    actions: {
        addCorn(state, { cornPositions, clientId }, { setter }) {
            let currentState = state
            cornPositions.forEach(pos => {
                currentState = setter.addCorn(state, {
                    rect: {
                        x: Math.round(pos.x),
                        y: Math.round(pos.y),
                        w: 2,
                        h: 2
                    },
                    color: [255, 255, 0],
                    clientId
                })
            })
            return currentState
        }
    },
    getters: {
        getAllCorn(state) {
            return flatten(Object.keys(state.corn || {}).map(key => {
                return state.corn[key] || []
            }))
        }
    },
    setters: {
        addCorn(state, entity) {
            return addEntityByClientId(state, { stateKey: 'corn', entity })
        }
    }
}

function addEntityByClientId(state, { stateKey, entity }) {
    let clientId = entity.clientId
    state[stateKey][clientId] = state[stateKey][clientId] || []
    state[stateKey][clientId].push(entity)
    return state
}

function flatten(list) {
    return list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );
}