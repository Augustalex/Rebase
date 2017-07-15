
let genHeightmap = require("./heightmap/genHeightmap.js")

function genSpecHeightmap(commons, data) {
	return genHeightmap(Object.assign({}, commons, data))
}
function genWaterMap(commons) {
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
		water: genWaterMap(commons),
		secondary: genSecondaryMap(commons),
	}
}
function createWaterType(primary, secondary) {
	const water = primary * 128 + secondary * 64 + 63
	return {
		type: "water",
		color: {
			r: 0,
			g: 0,
			b: water,
		}
	}
}
function createGrassType(primary, secondary) {
	const grass = secondary * 128 + 127
	return {
		type: "grass",
		color: {
			r: 0,
			g: grass,
			b: 0,
		}
	}
}
function genTerrain(seed) {
	let maps = genMaps(seed)

	return maps.water.map((x, y, v) => {
		const secondary = maps.secondary.get(x, y)

		if(v < 0.40) {
			return createWaterType(v, secondary)
		}
		else {
			return createGrassType(null, secondary)
		}
	})
}

module.exports = genTerrain
