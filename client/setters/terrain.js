
module.exports = {
	setTerrain(state, terrain) {
        console.log('setTerrain', terrain);
        state.terrain = terrain

		let canvas = document.createElement('canvas')
		canvas.width = terrain.w * 5
		canvas.height = terrain.h * 5
		canvas.style.width = `${terrain.w * 5}px`
		canvas.style.height = `${terrain.h * 5}px`
		let ctx = canvas.getContext('2d')
        for(let y = 0; y < terrain.h; y++) {
        	for(let x = 0; x < terrain.w; x++) {
        		let pixel = terrain.m[x + y * terrain.w]
        		setColor(ctx, pixel.color)
        		ctx.fillRect(x * 5, y * 5, 5, 5)
        	}
        }
		convertCanvasToImage(canvas, image => {
			state.terrainImage = image
		})
		return state
	}
}

// Converts canvas to an image
function convertCanvasToImage(canvas, callback) {
    var image = new Image();
    image.onload = function(){
        callback(image);
    }
    image.src = canvas.toDataURL("image/png");
}


function setColor(ctx, { r, g, b }) {
    // console.log('setColor', `(${r},${g},${b})`);
    ctx.fillStyle = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`
}