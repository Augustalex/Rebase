module.exports = {
    addHouse(state, house) {
        state.houses[house.clientId] = state.houses[house.clientId] || []
        state.houses[house.clientId].push(house)
        return state
    }
}