let skinToneGenerator = require('../misc/skinToneGenerator.js')

module.exports = function (deps) {

    let store = deps.store
    let setColor = deps.setColor
    let keysPressed = deps.keysPressed
    let rand = deps.rand

    return {
        run,
        draw
    }

    function run(delta) {
        let clientId = store.selector.getClientId()
        let mills = store.selector.getAllMillsForPlayer(clientId)
        for (let mill of mills) {
            let cornCount = Math.round(Math.random() * mill.productivity * delta)
            let range = inflate(mill.rect, mill.rangeFactor)
            let cornPositions = forCount(cornCount, () => randPositionInRange(range))
            store.action.addCorns({ cornPositions })
        }
    }

    function forCount(c, lambda) {
        let agg = []
        for (let i = 0; i < cornCount; i++) {
            agg.push(lambda())
        }
        return agg
    }

    function randPositionInRange(range) {
        return {
            x: Math.floor(range.x + Math.random() * (range.x + range.w)),
            y: Math.floor(range.y + Math.random() * (range.y + range.h))
        }
    }

    function inflate(box, factor) {
        return {
            x: box.x - box.w * factor * 0.5 - box.w,
            y: box.y - box.h * factor * 0.5 - box.h,
            w: box.w * factor,
            h: box.h * factor
        }
    }

    function draw() {
        let mills = store.selector.getAllHouses()
        for (let mill of mills) {
            let rect = mill.rect
            let color = mill.color
            setColor({
                r: color[0],
                g: color[1],
                b: color[2]
            })
            ctx.fillRect(rect.x, rect.y, rect.w, rect.h)

            if (mill.details) {
                let details = mill.details
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
}