
module.exports = {
    spawnPerson(state, {clientId, personId, color, playerPos }, { setter }){
        return setter.addPerson(state, {
            startedWalking: 0,
            walkTime: 0,
            direction: 0,
            rect: {
                x: playerPos.x, y: playerPos.y, w: 10, h: 10,
                details: [{
                    relX: 0,
                    relY: 8,
                    w: 10,
                    h: 2
                }]
            },
            color,
            speed: 10,
            id: personId,
            clientId
        })
    },
    adjustPersonPosition(state, { personId, clientId, position }, { setter }){
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
    },
    personAttackTarget(state, { clientId, personId, targetClientId, targetId }, { setter }) {
        return setter.setPersonAttackTarget(state, {
            personKey: `${clientId}:${personId}`,
            targetKey: `${targetClientId}:${targetId}`
        })
    }
}