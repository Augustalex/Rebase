
let hashInt = require("hash-int")
let Matrix = require("./matrix.js")
let dumpImage = require("./dumpImage.js")

function genIntHeight(x, y, o) {
	return hashInt(o + hashInt(x + hashInt(y + hashInt(1337))))
}
function genHeight(x, y, o) {
	return genIntHeight(x, y, o) / Math.pow(2, 32)
}
function genHeights(w, h, o) {
	let heights = Matrix(w, h)
	heights.map((x, y) => genHeight(x, y, o))
	return heights
}

let seed = Math.floor(Math.random() * 100)
let heights = genHeights(200, 200, seed)
dumpImage(heights)

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
