let setters = [
    require('./setters/player.js'),
    require('./setters/user.js'),
    require('./setters/building.js'),
    require('./setters/misc.js'),
    require('./setters/terrain.js')
]

module.exports = function (deps) {
    let res = {}
    setters.forEach(o => { res = Object.assign(res, o) })
    return res
}