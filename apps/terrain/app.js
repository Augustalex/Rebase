
let dumpImage = require("./dumpImage.js")
let genHeightmap = require("./heightmap/genHeightmap.js")

let heightmap = genHeightmap({
	seed: 0,
	octaves: {
		min: 2,
		max: 9,
	},
	weight: 5,
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
