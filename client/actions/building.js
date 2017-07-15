let detailsHelper = require('../misc/detailsHelper.js')

module.exports = {
    createHouse(state, {clientId}, { selector, setter }){
        let player = selector.getPlayerWithId(clientId)
        let playerW = 25
        let playerH = 25
        let flagDetails = detailsHelper.createFlag([...selector.getPlayerWithId(clientId).color], playerW, playerH)
        
        return setter.addHouse(state, {
            rect:{
                x: player.rect.x,
                y: player.rect.y,
                w: playerW,
                h: playerH
            },
            details: [...flagDetails],
            color:[153, 76, 0],
            clientId: clientId
        })
    }
}