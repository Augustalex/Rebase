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
            store.actions.addCorn({ cornPositions, clientId })
        }
    }

    function forCount(count, lambda) {
        let agg = []
        for (let i = 0; i < count; i++) {
            agg.push(lambda())
        }
        return agg
    }

    function randPositionInRange(range) {
        return {
            x: Math.floor(range.x + Math.random() * range.w),
            y: Math.floor(range.y + Math.random() * range.h)
        }
    }

    function inflate(box, factor) {
        let finalW = box.w * factor
        let finalH = box.h * factor
        let finalX = box.x - finalW + box.w * 0.5
        let finalY = box.y - finalH + box.h * 0.5
        return {
            x: finalX + finalW * 0.5,
            y: finalY + finalH * 0.5,
            w: finalW,
            h: finalH
        }
    }

    function draw() {
        let mills = store.selector.getAllMills()
        for (let mill of mills) {
            drawEntity(mill)
        }
        let allCorn = store.selector.getAllCorn()
        for (let corn of allCorn) {
            drawEntity(corn)
        }
    }

    function drawEntity(entity) {
        let rect = entity.rect
        let color = entity.color || [255,0,0]
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
