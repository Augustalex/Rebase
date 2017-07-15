
let Matrix = require("./matrix.js")
let interpolate = require("./interpolate.js")

function genHeightmap(w, h, heights) {
	const dx = w / (heights.getW() - 1)
	const dy = h / (heights.getH() - 1)

	return Matrix(w, h).map((x, y) => {
		const bix = Math.floor(x / dx)
		const biy = Math.floor(y / dy)
		const tix = bix + 1
		const tiy = biy + 1

		const bl = heights.get(bix, biy)
		const br = heights.get(tix, biy)
		const tl = heights.get(bix, tiy)
		const tr = heights.get(tix, tiy)

		const bx = bix * dx
		const by = biy * dy
		const tx = tix * dx
		const ty = tiy * dy

		return interpolate(bl, br, tl, tr, bx, by, tx, ty, x, y)
	})
}

module.exports = genHeightmap
