const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

module.exports = {
    getAllPersons(state) {
        return flatten(Object.keys(state.persons || {}).map(key => {
            return state.persons[key] || []
        }))
    }
}
