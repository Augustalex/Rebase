
let genHeightmap = require("./heightmap/genHeightmap.js")

function genSpecHeightmap(commons, data) {
	return genHeightmap(Object.assign({}, commons, data))
}
function genPrimaryMap(commons) {
	return genSpecHeightmap(commons, {
		octaves: {
			min: 2,
			max: 5,
		},
		weight: 8,
	})
}
function genSecondaryMap(commons) {
	return genSpecHeightmap(commons, {
		octaves: {
			min: 2,
			max: 9,
		},
		weight: 5,
	})
}
function genMaps(seed) {
	const commons = {
		seed: seed,
		width: 512,
		height: 512,
	}
	return {
		primary: genPrimaryMap(commons),
		secondary: genSecondaryMap(commons),
	}
}
function createWaterType(p, s) {
	const water = p * 128 + s * 64 + 63
	return {
		type: "water",
		color: {
			r: 0,
			g: 0,
			b: water,
		}
	}
}
function createGrassType(s) {
	const grass = s * 128 + 127
	return {
		type: "grass",
		color: {
			r: 0,
			g: grass,
			b: 0,
		}
	}
}
function createBeachType(s) {
	s = s * 0.3 + 0.74
	return {
		type: "beach",
		color: {
			r: s * 245,
			g: s * 238,
			b: s * 158,
		}
	}
}
function createType(p, s, seaLvl) {
	if(p < seaLvl) {
		return createWaterType(p, s)
	}
	else if(p < seaLvl + 0.08) {
		return createBeachType(s)
	}
	else {
		return createGrassType(s)
	}
}
function createPixel(p, s, seaLvl) {
	const pixel = createType(p, s, seaLvl)
	return {
		type: pixel.type,
		color: {
			r: Math.round(pixel.color.r),
			g: Math.round(pixel.color.g),
			b: Math.round(pixel.color.b),
		}
	}
}
function average(map) {
	let total = 0
	map.foreach((x, y, v) => {
		total += v
	})
	return total / (map.getW() * map.getH())
}
function genTerrain(seed) {
	let maps = genMaps(seed)
	const seaLvl = average(maps.primary) * 1.05

	return maps.primary.zip(maps.secondary, (x, y, p, s) => {
		return createPixel(p, s, seaLvl)
	}).toJS()
}

module.exports = genTerrain
