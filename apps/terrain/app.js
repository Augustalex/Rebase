
let hashInt = require("hash-int")
/*
for(let i = 0; i < 100; i++) {
	console.log(hashInt(i).toLocaleString())
}
*/
function genIntHeight(x, y, o) {
	return hashInt(o + hashInt(x + hashInt(y + hashInt(1337))))
}
function genHeight(x, y, o) {
	return genIntHeight(x, y, 0) / Math.pow(2, 32)
}
let Matrix = (w, h) => {
	let matrix = []
	for(var i = 0; i < w * h; i++) {
		matrix[i] = 0
	}

	function getW() {
		return w
	}
	function getH() {
		return h
	}
	function key(x, y) {
		return x + y * w
	}
	function get(x, y) {
		return matrix[key(x, y)]
	}
	function set(x, y, v) {
		matrix[key(x, y)] = v
	}
	function foreach(cb) {
		for(let y = 0; y < h; y++) {
			for(let x = 0; x < w; x++) {
				cb(x, y, get(x, y))
			}
		}
	}
	return {
		getW,
		getH,
		get,
		set,
	}
}
function genHeights(w, h, o) {
	let heights = Matrix(w, h)
	for(let y = 0; y < h; y++) {
		for(let x = 0; x < w; x++) {
			heights.set(x, y, genHeight(x, y, o))
		}
	}
	return heights
}

let PNGImage = require("pngjs-image")

function dumpImage(pixels) {
	let w = pixels.getW()
	let h = pixels.getH()
	let image = PNGImage.createImage(w, h);

	for(let y = 0; y < h; y++){
		for(let x = 0; x < w; x++) {
			image.setAt(x, y, {
				red: 0,
				green: pixels.get(x, y) * 255,
				blue: 0,
				alpha: 255,
			})
		}
	}
	image.writeImage("./dump.png", (err) => {
		if(err)
			console.log(err)
		console.log("Image written to dump.png")
	})
}
let heights = genHeights(50, 50, 0)
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
