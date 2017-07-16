
module.exports = {
	setTerrain(state, terrain) {
        console.log('setTerrain', terrain);
        state.terrain = terrain
		return state
	}
}
