let detailsHelper = require('../misc/detailsHelper.js')

module.exports = {
    createHouse(state, {clientId}, { selector, setter }){
        let player = selector.getPlayerWithId(clientId)
        let flagDetails = detailsHelper.createFlag([...selector.getPlayerWithId(clientId).color])
        
        return setter.addHouse(state, {
            rect:{
                x: player.rect.x,
                y: player.rect.y,
                w: 25,
                h: 25
            },
            details: [...flagDetails],
            color:[153, 76, 0],
            clientId: clientId
        })
    }
}