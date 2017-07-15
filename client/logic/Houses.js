module.exports = function (deps) {

    let store = deps.store
    let setColor = deps.setColor

    return {
        run: () => {},
        draw
    }

    function draw() {
        let houses = store.selector.getAllHouses();
        for (let house of houses) {
            let rect = house.rect
            let color = house.color
            setColor({
                r: color[0],
                g: color[1],
                b: color[2]
            })
            ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
        }
    }
}