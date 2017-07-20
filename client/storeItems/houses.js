let detailsHelper = require('../misc/detailsHelper.js')

module.exports = {
    actions: {
        createHouse(state, { clientId, entityId, playerPos, playerColor }, { setter }){
            let playerW = 25
            let playerH = 25
            let flagDetails = detailsHelper.createFlag(playerColor, playerW, playerH)

            return setter.addHouse(state, {
                rect: {
                    x: playerPos.x,
                    y: playerPos.y,
                    w: playerW,
                    h: playerH
                },
                details: flagDetails,
                color: [153, 76, 0],
                clientId,
                id: entityId
            })
        }
    },
    getters: {
        getAllHouses(state) {
            return flatten(Object.keys(state.houses || {}).map(key => {
                return state.houses[key] || []
            }))
        }
    },
    setters: {
        addHouse(state, entity) {
            return addEntityByClientId(state, { stateKey: 'houses', entity })
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