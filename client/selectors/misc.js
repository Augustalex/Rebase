const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

module.exports = {
    getPersonById(state, { key }) {
        let person = state.persons[key];
        return person
    },
    getAllPersons(state) {
        return flatten(Object.keys(state.persons || {}).map(key => {
            return state.persons[key] || []
        }))
    },
    getAllEnemies(state, { clientId }) {
        return flatten(Object.keys(state.persons || {}).map(key => {
            return state.persons[key] || []
        })).filter(p => p.clientId !== clientId)
    }
}
