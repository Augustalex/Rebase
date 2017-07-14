/**
 * Created by august-play on 2017-07-07.
 */

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let dudad = {
    rect: {
        x: 10,
        y: 10,
        w: 5,
        h: 5
    }
}

window.onkeydown = function (event) {
    let key = String.fromCharCode(event.keyCode).toLowerCase()
    switch (key) {
        case "w":
            dudad.rect.y -= dudad.speed
            break
        case "a":
            dudad.rect.x -= dudad.speed
            break
        case "s":
            dudad.rect.y += dudad.speed
            break
        case "d":
            dudad.rect.x += dudad.speed
            break
        default:
            console.log(key);
    }
    if (key === 'CTRL_C') {
        process.exit()
    }
}

function run(state, lastRun) {
    let now = Date.now() / 1000
    let delta = now - lastRun

    if(state.getDudad().score < 0){
        gameOver()
        return
    }

    setColor(0,0,0)
    clear()

    let drawables = state.getDrawablesByColor()
    Object.keys(drawables).forEach(colorKey => {
        if (drawables[colorKey].length < 1) return
        let color = drawables[colorKey][0].color
        setColor(color)
        drawables[colorKey].forEach(drawable => {
            let rect = drawable.rect;
            ctx.fillRect(rect.x * scale, rect.y * scale, Math.round(rect.w * scale), Math.round(rect.h * scale))
        })
    })

    let world = state.getWorld()
    ctx.font = '15px Arial'
    ctx.fillText(`Score: ${Math.floor(state.getDudad().score)}\tPopulation: ${world.population()}`, 10, 10);
    if(state.getUser().mouse){
        let mouseEvent = state.getUser().mouse
        let mousePos = { x: mouseEvent.offsetX, y: mouseEvent.offsetY }
        ctx.fillText(`Mouse position - x:${mousePos.x} y:${mousePos.y}`, 10, 35);
    }

    let populationByHouse = world.populationByHouse();
    let y = 50
    for(let houseName of Object.keys(populationByHouse)){
        ctx.fillText(`${houseName}: ${populationByHouse[houseName]}`, 10, y);
        y += 20
    }

    state.getPopups().forEach(p => {
        setColor(p.bgColor)
        let bounds = p.getBounds()
        ctx.fillRect(bounds.x, bounds.y, bounds.w, bounds.h)
        setColor(p.textColor)
        ctx.fillText(p.text, bounds.x + 7, bounds.y + 17)
    })

    if(state.isPaused()){
        ctx.font = '20px Comic Sans MS'
        setColor(255,0,0)
        ctx.fillText('PAUSED', 800, 100)
    }
    let newState = Logic(state, delta)

    requestAnimationFrame(() => run(newState, now))
}

function gameOver() {
    ctx.font = '50px Comic Sans MS'
    setColor(255,0,0)
    ctx.fillText('GAME OVER', 450, 500)
}

function setColor({ r, g, b }){
    ctx.fillStyle = `rgb(${r},${g},${b})`
}

function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

function inSpan(a, b, c) {
    return a >= b && a <= c
}

function inBox(point, rect) {
    return inSpan(point.x, rect.x, rect.x + rect.w) && inSpan(point.y, rect.y, rect.y + rect.h)
}

requestAnimationFrame(() => run(state, Date.now() / 1000))
