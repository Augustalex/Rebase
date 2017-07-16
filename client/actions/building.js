let detailsHelper = require('../misc/detailsHelper.js')

module.exports = {
    createHouse(state, { clientId, playerPos, playerColor }, { setter }){
        let playerW = 25
        let playerH = 25
        let flagDetails = detailsHelper.createFlag(playerColor, playerW, playerH)
        
        return setter.addHouse(state, {
            rect:{
                x: playerPos.x,
                y: playerPos.y,
                w: playerW,
                h: playerH
            },
            details: flagDetails,
            color:[153, 76, 0],
            clientId
        })
    }
}