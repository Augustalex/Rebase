
module.exports = {
    createHouse(state, {clientId}, { selector, setter }){
        let player = selector.getPlayerWithId(clientId)
        
        return setter.addHouse({
            rect:{
                x: player.rect.x,
                y: player.rect.y,
                w: 25,
                h: 25
            },
            color:[153, 76, 0],
            clientId: clientId
        })
    }
}