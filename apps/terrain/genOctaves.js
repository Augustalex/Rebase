
let hashInt = require("hash-int")
let Matrix = require("./matrix.js")
let interpolateHeights = require("./interpolateHeights.js")
let F = require("./f.js")

function genIntHeight(x, y, o, s) {
	let h = 1 << 30
	h = hashInt(h + y)
	h = hashInt(h + x)
	h = hashInt(h + o)
	return h
}
function genHeight(x, y, o) {
	return genIntHeight(x, y, o) / Math.pow(2, 32)
}
function genHeights(w, h, o) {
	return Matrix(w, h).map((x, y) => genHeight(x, y, o))
}
function genOctave(w, h, o, seed) {
	let s = (1 << o) + 1
	let heights = genHeights(s, s, seed)
	return interpolateHeights(w, h, heights)
}
function genOctaves(w, h, min, max, seed) {
	return F.map(F.range(min, max), (o) => {
		return genOctave(w, h, o, seed)
	})
}

module.exports = genOctaves
