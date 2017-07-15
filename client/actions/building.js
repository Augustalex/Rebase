
module.exports = {
    createHouse(state, {clientId}, { selector, setter }){
        let player = selector.getPlayerWithId(clientId)
        let flagColor = [...selector.getPlayerWithId(clientId).color]
        
        return setter.addHouse(state, {
            rect:{
                x: player.rect.x,
                y: player.rect.y,
                w: 25,
                h: 25
            },
            details: [{
                relX: 10,
                relY: 5,
                w: 2,
                h: 10,
                color:[0, 0, 0]
            },{
                relX: 12,
                relY: 7,
                w: 10,
                h: 5,
                color: flagColor
            }],
            color:[153, 76, 0],
            clientId: clientId
        })
    }
}