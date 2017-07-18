module.exports = {
    actions: {
        createHouse(state, { clientId, playerPos, playerColor }, { setter }){
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
                clientId
            })
        },
        createMill(state, { clientId, playerPos, playerColor }, { setter }){
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
                color: [153, 76, 153],
                clientId,
                productivity: 10
            })
        }
    },
    getters: {
        getAllHouses(state) {
            return flatten(Object.keys(state.houses || {}).map(key => {
                return state.houses[key] || []
            }))
        },
        getAllMillsForPlayer(state, clientId) {
            return state.houses[clientId] || []
        }
    },
    setters: {
        addHouse(state, house) {
            state.houses[house.clientId] = state.houses[house.clientId] || []
            state.houses[house.clientId].push(house)
            return state
        }
    }
}

function flatten(list) {
    return list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );
}