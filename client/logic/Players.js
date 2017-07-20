let skinToneGenerator = require('../misc/skinToneGenerator.js')
let newId = require('../misc/newId.js')

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
        Object.keys(keysPressed).forEach(key => {
            let action = null
            let data = {}
            switch (key) {
                case 'w':
                    action = store.actions.movePlayerUp
                    break
                case 'a':
                    action = store.actions.movePlayerLeft
                    break
                case 's':
                    action = store.actions.movePlayerDown
                    break
                case 'd':
                    action = store.actions.movePlayerRight
                    break
                case 'h':
                    action = store.actions.createHouse
                    break
                case 'm':
                    action = store.actions.createMill
                    break
                case 'p':
                    action = store.actions.spawnPerson
                    let baseColor = store.selector.getPlayerWithId(clientId).color
                    let skinColor = skinToneGenerator.variationOnBase(baseColor)
                    data = {
                        color: skinColor
                    }
                    break
            }
            if (action) {
                let player = store.selector.getPlayerWithId(clientId)
                action(Object.assign(data, {
                    delta,
                    clientId,
                    entityId: newId(),
                    playerPos: { x: player.rect.x, y: player.rect.y },
                    playerColor: player.color,
                    playerSpeed: player.speed
                }))
            }
        })
    }

    function draw() {
        let players = store.selector.getAllPlayers()
        for (let player of players) {
            let rect = player.rect
            let color = player.color
            setColor({
                r: color[0],
                g: color[1],
                b: color[2]
            })
            ctx.fillRect(rect.x, rect.y, rect.w, rect.h)

            let details = player.details
            for (let detail of details) {
                let color = detail.color
                setColor({
                    r: color[0],
                    g: color[1],
                    b: color[2]
                })
                let w = detail.w || (rect.w * detail.relW)
                let h = detail.h || (rect.h * detail.relH)
                let x = rect.x + detail.relX
                let y = rect.y + detail.relY
                ctx.fillRect(x, y, w, h)
            }
        }
    }
}