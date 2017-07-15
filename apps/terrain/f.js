
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
		return null
	}
	let c = arr[0]
	for(let i = 1; i < arr.length; i++) {
		c = cb(c, arr[i])
	}
	return c
}

module.exports = {
	range,
	map,
	fold,
}
