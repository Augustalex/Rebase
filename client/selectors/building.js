const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

module.exports = {
    getAllHouses(state) {
        return flatten(Object.keys(state.players).map(key => {
            return state.players[key].houses || []
        }))
    }
}
