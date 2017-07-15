
function Matrix(w, h) {
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
	function map(cb) {
		var mat = Matrix(w, h)
		foreach((x, y, v) => {
			mat.set(x, y, cb(x, y, v))
		})
		return mat
	}
	function toString() {
		var str = ""
		for(let y = 0; y < h; y++) {
			for(let x = 0; x < w; x++) {
				str += get(x, y) + " "
			}
			str += '\n'
		}
		return str
	}
	return {
		getW,
		getH,
		get,
		set,
		foreach,
		map,
		toString,
	}
}

module.exports = Matrix
