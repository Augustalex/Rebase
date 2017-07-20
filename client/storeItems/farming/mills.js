let detailsHelper = require('../../misc/detailsHelper.js')

module.exports = {
    actions: {
        createMill(state, { clientId, entityId, playerPos, playerColor }, { setter }){
            let playerW = 25
            let playerH = 25
            let flagDetails = detailsHelper.createFlag(playerColor, playerW, playerH)

            return setter.addMill(state, {
                rect: {
                    x: Math.round(playerPos.x),
                    y: Math.round(playerPos.y),
                    w: playerW,
                    h: playerH
                },
                details: flagDetails,
                color: [153, 76, 153],
                clientId,
                id: entityId,
                productivity: 25,
                rangeFactor: 6
            })
        }
    },
    getters: {
        getAllMillsForPlayer(state, clientId) {
            return state.mills[clientId] || []
        },
        getAllMills(state, clientId) {
            return flatten(Object.keys(state.mills || {}).map(key => {
                return state.mills[key] || []
            }))
        }
    },
    setters: {
        addMill(state, entity) {
            return addEntityByClientId(state, { stateKey: 'mills', entity })
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