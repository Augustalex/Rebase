let playerSetters = require('./setters/player.js')
let userSetters = require('./setters/user.js')
let buildingSetters = require('./setters/building.js')
let miscSetters = require('./setters/misc.js')

module.exports = function (deps) {
    let originalSetters = Object.assign({}, playerSetters, userSetters, buildingSetters, miscSetters)
    return originalSetters
}