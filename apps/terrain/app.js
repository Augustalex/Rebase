
let hashInt = require("hash-int")
let Matrix = require("./matrix.js")
let dumpImage = require("./dumpImage.js")
let genHeightmap = require("./genHeightmap.js")

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
	let heights = Matrix(w, h)
	heights = heights.map((x, y) => genHeight(x, y, o))
	return heights
}

function genOctave(w, h, o, seed) {
	let s = (1 << o) + 1
	let heights = genHeights(s, s, seed)
	return genHeightmap(w, h, heights)
}

let seed = 0//Math.floor(Math.random() * 100)

const minOctave = 2
const maxOctave = 9
const weight = 5

let octaves = []
for(var o = minOctave; o <= maxOctave; o++) {
	const s = 1 << maxOctave
	octaves.push(genOctave(s, s, o, seed))
}

let fullHeightmap = octaves[0]
for(var i = 1; i < octaves.length; i++) {
	fullHeightmap = fullHeightmap.zip(octaves[i], (x, y, l, r) => {
		const lw = (weight - 1) / weight
		const rw = 1 / weight
		return l * lw + r * rw
	})
}

dumpImage(fullHeightmap)

/*
let socket = io('http://192.168.1.19:8081')

const DUMMY_TERRAIN = [
]

socket.on('requestPlayer', () => {
	socket.emit('command', {
		command: 'setTerrain',
		terrain: DUMMY_TERRAIN,
	})
})
*/
