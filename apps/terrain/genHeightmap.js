
let F = require("./f.js")
let genOctaves = require("./genOctaves.js")

function foldOctaves(octaves, weight) {
	const rweight = 1 / weight
	const lweight = 1 - rweight

	return F.fold(octaves, (lmat, rmat) => {
		return lmat.zip(rmat, (x, y, l, r) => l * lweight + r * rweight)
	})
}
function now() {
	return new Date().getTime()
}
function genHeightmap(options) {
	const seed = options.seed || now()

	const minOctave = options.octaves.min
	const maxOctave = options.octaves.max

	const defaultSize = 1 << maxOctave
	const width = options.width || defaultSize
	const height = options.height || defaultSize

	const weight = options.weight

	let octaves = genOctaves(width, height, minOctave, maxOctave, seed)
	let heightmap = foldOctaves(octaves, weight)
	return heightmap
}

module.exports = genHeightmap
