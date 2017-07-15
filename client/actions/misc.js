
module.exports = {
    spawnPerson(state, {clientId, personId, color}, { selector, setter }){
        console.log('SPAWN PERSON', clientId, personId)
        let player = selector.getPlayerWithId(clientId)
        let x = player.rect.x
        let y = player.rect.y
        return setter.addPerson(state, {
            startedWalking: 0,
            walkTime: 0,
            direction: 0,
            rect: {
                x, y, w: 10, h: 10
            },
            color,
            speed: 10,
            id: personId,
            clientId
        })
    },
    adjustPersonPosition(state, { personId, clientId, position }, { selector, setter }){
        let key = `${clientId}:${personId}`
        return setter.setPersonPosition(state, { position, key })
    },
    walkInDirection(state, data, { selector, setter }){
        let key = `${data.clientId}:${data.personId}`
        return setter.setPersonWalkParameters(state, {
            key,
            startedWalking: data.startedWalking,
            walkTime: data.walkTime,
            direction: data.direction
        })
    }
}

function rand(max){
    return Math.floor(Math.random() * max)
}