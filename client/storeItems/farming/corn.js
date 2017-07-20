module.exports = {
    actions: {
        addCorn(state, { cornInfos, millId, clientId }, { setter }) {
            let currentState = state
            cornInfos.forEach(cornInfo => {
                currentState = setter.addCorn(state, {
                    rect: {
                        x: Math.round(cornInfo.position.x),
                        y: Math.round(cornInfo.position.y),
                        w: 2,
                        h: 2
                    },
                    color: [255, 255, 0],
                    clientId,
                    millId,
                    id: cornInfo.entityId
                })
            })
            return currentState
        }
    },
    getters: {
        getAllCorn(state) {
            return flatten(Object.keys(state.corn || {}).map(key => {
                return flatten(Object.keys(state.corn[key] || {}).map(innerKey => {
                    return state.corn[key][innerKey] || []
                }))
            })).filter(c => !c.harvested)
        },
        getAllCornByClientId(state, clientId) {
            return flatten(Object.keys(state.corn[clientId] || {}).map(innerKey => {
                return state.corn[clientId][innerKey] || []
            }))
        },
        getCornById(state, id) {
            return getCornByIdOrNull(state, id)
        }
    },
    setters: {
        addCorn(state, entity) {
            return addEntityByKeyChain(state, { keys: ['corn', entity.clientId, entity.millId], entity })
        },
        setCornHarvested(state, { personKey, cornId }) {
            let corn = getCornByIdOrNull(state, cornId)
            console.log('setCornHarvested', cornId, corn);
            corn.harvested = true
            return state
        }
    }
}

function getCornByIdOrNull(state, cornId) {
    for (let client of Object.keys(state.corn)) {
        for (let mill of Object.keys(state.corn[client])) {
            for (let corn of state.corn[client][mill]) {
                if(corn.id === cornId) return corn
            }
        }
    }
    return null
}

function addEntityByKeyChain(state, { keys, entity }) {
    let location = state
    for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
            location = location[keys[i]] = location[keys[i]] || []
        }
        else {
            location = location[keys[i]] = location[keys[i]] || {}
        }
    }
    location.push(entity)
    return state
}

function flatten(list) {
    return list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );
}