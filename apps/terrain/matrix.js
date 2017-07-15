
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
		foreach((x, y, v) => {
			set(x, y, cb(x, y, v))
		})
	}
	return {
		getW,
		getH,
		get,
		set,
		foreach,
		map,
	}
}

module.exports = Matrix
