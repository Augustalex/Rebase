
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
		weight: 10,
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
function createType(p, s) {
	if(p < 0.40) {
		return createWaterType(p, s)
	}
	else {
		return createGrassType(s)
	}
}
function genTerrain(seed) {
	let maps = genMaps(seed)

	return maps.primary.zip(maps.secondary, (x, y, p, s) => {
		return createType(p, s)
	})
}

module.exports = genTerrain
