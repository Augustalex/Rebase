module.exports = {
    addHouse(state, house) {
        state.players[house.clientId].houses = state.players[house.clientId].houses || []
        state.players[house.clientId].houses.push(house)
        return state
    }
}