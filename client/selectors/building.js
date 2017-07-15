const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

module.exports = {
    getAllHouses(state) {
        return flatten(Object.keys(state.houses || {}).map(key => {
            return state.houses[key] || []
        }))
    }
}
