
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

function range(a, b) {
	let r = []
	for(let i = a; i <= b; i++) {
		r.push(i)
	}
	return r
}
function map(arr, cb) {
	let r = []
	for(let k in arr) {
		r.push(cb(arr[k], k))
	}
	return r
}
function fold(arr, cb) {
	if(arr.length === 0) {
		return []
	}
	let c = arr[0]
	for(let i = 1; i < arr.length; i++) {
		c = cb(c, arr[i])
	}
	return c
}

let seed = 0//Math.floor(Math.random() * 100)

const minOctave = 2
const maxOctave = 9

const weight = 5
const rweight = 1 / weight
const lweight = 1 - rweight

const imgSize = 1 << maxOctave
let octaves = map(range(minOctave, maxOctave),
	(o) => genOctave(imgSize, imgSize, o, seed))

let heightmap = fold(octaves, (lmat, rmat) => {
	return lmat.zip(rmat, (x, y, l, r) => l * lweight + r * rweight)
})

dumpImage(heightmap)

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
