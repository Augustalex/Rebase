
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
function createBeachType() {
	return {
		type: "beach",
		color: {
			r: 245,
			g: 238,
			b: 158,
		}
	}
}
function createType(p, s, seaLvl) {
	if(p < seaLvl) {
		return createWaterType(p, s)
	}
	else if(p < seaLvl + 0.01) {
		return createBeachType(s)
	}
	else {
		return createGrassType(s)
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
		return createType(p, s, seaLvl)
	})
}

module.exports = genTerrain
