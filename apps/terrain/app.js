
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
	heights = heights.map((x, y) => genHeight(x, y, o))
	return heights
}
function clamp(x, min, max) {
	if(x < min) {
		return min
	}
	else if(x > max){
		return max
	}
	else {
		return x
	}
}
function smoothstep(a, b, x) {
	x = clamp((x - a) / (b - a), 0, 1)
	return x * x * (3 - 2 * x)
}
function interpolate2d(ay, by, ax, bx, x) {
	return ay + (by - ay) * smoothstep(ax, bx, x)
}
function interpolate3d(bl, br, tl, tr, bx, bz, tx, tz, x, z) {
	let by = interpolate2d(bl, br, bx, tx, x)
	let ty = interpolate2d(tl, tr, bx, tx, x)
	return interpolate2d(by, ty, bz, tz, z)
}

let seed = Math.floor(Math.random() * 100)

let heights = genHeights(2, 2, seed)
let heightmap = Matrix(200, 200).map((x, y) => {
	return interpolate3d(
		heights.get(0, 0),
		heights.get(1, 0),
		heights.get(0, 1),
		heights.get(1, 1),
		10, 10, 190, 190, x, y)
})
//console.log(heightmap.map((x,y,v)=>Math.floor(v*10)).toString())
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
