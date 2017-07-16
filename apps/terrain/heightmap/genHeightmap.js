
let F = require("../utils/f.js")
let genOctaves = require("./genOctaves.js")

function foldOctaves(octaves, weight) {
	const rweight = 1 / weight
	const lweight = 1 - rweight

	octaves = F.map(octaves, (octave) => {
		return octave.map((x, y, v) => v * 2 - 1)
	})
	return F.fold(octaves, (lmat, rmat) => {
		return lmat.zip(rmat, (x, y, l, r) => l * lweight + r * rweight)
	})
	.map((x, y, v) => (v + 1) / 2)
}
function now() {
	return new Date().getTime()
}
function getSeed(seed) {
	if(typeof seed === "number") {
		return seed
	}
	else {
		return now()
	}
}
function genHeightmap(options) {
	const seed = getSeed(options.seed)

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
