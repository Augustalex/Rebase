
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

module.exports = interpolate3d
