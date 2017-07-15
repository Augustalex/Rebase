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
            let data = { delta, clientId }
            switch (key) {
                case 'w':
                    store.actions.movePlayerUp(data)
                    break
                case 'a':
                    store.actions.movePlayerLeft(data)
                    break
                case 's':
                    store.actions.movePlayerDown(data)
                    break
                case 'd':
                    store.actions.movePlayerRight(data)
                    break
                case 'h':
                    store.actions.createHouse(data)
                    break
                case 'p':
                    store.actions.spawnPerson({
                        clientId,
                        personId: `${Math.round(Math.random() * 100000)}`,
                        color: [rand(255), rand(255), rand(255)]
                    })
                    break
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
        }
    }
}