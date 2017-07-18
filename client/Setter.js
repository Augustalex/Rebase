let setters = [
    require('./storeItems/players.js'),
    require('./storeItems/users.js'),
    require('./storeItems/buildings.js'),
    require('./storeItems/persons.js'),
    require('./storeItems/terrain.js')
]

module.exports = function (deps) {
    let res = {}
    setters.forEach(o => { res = Object.assign(res, o.setters) })
    return res
}