let modules = [
    require('./Terrain.js'),
    require('./Persons.js'),
    require('./Houses.js'),
    require('./Players.js'),
]

module.exports = function (deps) {

    let store = deps.store
    let localStore = deps.localStore
    let keysPressed = deps.keysPressed

    let moduleDeps = {
        setColor,
        store,
        localStore,
        keysPressed,
        rand,
    }

    let loadedModules = modules.map(c => c(moduleDeps))

    return {
        run,
        draw
    }

    function run(delta) {
        loadedModules.forEach(m => m.run(delta))
    }

    function draw() {
        setColor(0, 0, 0)
        clear()

        loadedModules.forEach(m => m.draw())
    }

    function setColor({ r, g, b }) {
        ctx.fillStyle = `rgb(${r},${g},${b})`
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    function rand(max) {
        return Math.floor(Math.random() * max)
    }
}