let modules = [
    require('./Terrain.js'),
    require('./Persons.js'),
    require('./Houses.js'),
    require('./Mills.js'),
    require('./Players.js'),
]

module.exports = function (deps) {

    let store = deps.store
    let localStore = deps.localStore
    let keysPressed = deps.keysPressed
    let ctx = deps.ctx

    let moduleDeps = {
        setColor,
        store,
        localStore,
        keysPressed,
        rand,
        ctx,
        drawEntity
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

    function drawEntity(entity) {
        let rect = entity.rect
        let color = entity.color || [255, 0, 0]
        setColor({
            r: color[0],
            g: color[1],
            b: color[2]
        })
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h)

        if (entity.details) {
            let details = entity.details
            for (let detail of details) {
                let color = detail.color
                setColor({
                    r: color[0],
                    g: color[1],
                    b: color[2]
                })
                ctx.fillRect(rect.x + detail.relX, rect.y + detail.relY, detail.w, detail.h)
            }
        }
    }
}
