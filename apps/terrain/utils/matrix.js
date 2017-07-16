
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
	function zip(other, cb) {
		return map((x, y, l) => {
			return cb(x, y, l, other.get(x, y))
		})
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
	function toJS() {
		return {
			w: w,
			h: h,
			m: matrix,
		}
	}
	return {
		getW,
		getH,
		get,
		set,
		foreach,
		map,
		zip,
		toString,
	}
}

module.exports = Matrix
