
module.exports = function (deps) {
    let setColor = deps.setColor
    let ctx = deps.ctx

	return {
        run,
        draw
    }
    function run(delta) {
 	}
 	function draw() {
 		let terrain = store.selector.getTerrainImage();
 		if(!terrain) return
		ctx.drawImage(terrain,0,0)
        // for(let y = 0; y < terrain.h; y++) {
 		// 	for(let x = 0; x < terrain.w; x++) {
 		// 		let pixel = terrain.m[x + y * terrain.w]
 		// 		setColor(pixel.color)
 		// 		ctx.fillRect(x * 5, y * 5, 5, 5)
 		// 	}
 		// }
 	}
}
