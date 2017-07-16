
let Matrix = require("../utils/matrix.js")
let interpolate = require("./interpolate.js")

function interpolateHeights(w, h, heights) {
	const dx = w / (heights.getW() - 1)
	const dy = h / (heights.getH() - 1)

	return Matrix(w, h).map((x, y) => {
		const nx = x / dx
		const ny = y / dy

		const bix = Math.floor(nx)
		const biy = Math.floor(ny)
		const tix = bix + 1
		const tiy = biy + 1

		const lx = nx - bix
		const ly = ny - biy

		const bl = heights.get(bix, biy)
		const br = heights.get(tix, biy)
		const tl = heights.get(bix, tiy)
		const tr = heights.get(tix, tiy)

		return interpolate(bl, br, tl, tr, lx, ly)
	})
}

module.exports = interpolateHeights
