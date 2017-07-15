
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
function interpolate3d(ys, bx, bz, tx, tz, x, z) {
	let by = interpolate2d(ys[0], ys[1], bx, tx, x)
	let ty = interpolate2d(ys[2], ys[3], bx, tx, x)
	return interpolate2d(by, ty, bz, tz, z)
}
console.log(Matrix(20, 20)
	.map((x,y)=>interpolate3d([0,3,7,10],2,2,18,18,x,y))
	.map((x,y,v)=>Math.floor(v))
	.toString()
)

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
