
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
function smoothstep(px) {
	const x = clamp(px, 0, 1)
	return x * x * (3 - 2 * x)
}
function interpolate2d(a, b, x) {
	return a + (b - a) * smoothstep(x)
}
function interpolate3d(bl, br, tl, tr, x, z) {
	const by = interpolate2d(bl, br, x)
	const ty = interpolate2d(tl, tr, x)
	return interpolate2d(by, ty, z)
}

module.exports = interpolate3d
