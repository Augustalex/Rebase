
//let dumpImage = require("./dumpImage.js")
let genTerrain = require("./genTerrain.js")
let terrain = genTerrain()
//dumpImage(terrain)

let socket = io('http://192.168.1.19:8081')

socket.on('requestPlayer', () => {
	socket.emit('command', {
		command: 'setTerrain',
		terrain: terrain,
	})
})