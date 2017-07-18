let detailsHelper = require('../misc/detailsHelper.js')

module.exports = {
    actions: {
        spawnPerson(state, { clientId, personId, color, playerPos }, { setter }){
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
        },
        personKillTarget(state, { targetClientId, targetId }, { setter }) {
            return setter.setPersonDead(state, {
                key: `${targetClientId}:${targetId}`
            })
        }
    },
    setters: {
        addPerson(state, person) {
            let id = `${person.clientId}:${person.id}`
            state.persons[id] = person
            return state
        },
        setPersonWalkParameters(state, { key, startedWalking, walkTime, direction }){
            let person = state.persons[key]
            person.startedWalking = startedWalking
            person.walkTime = walkTime
            person.direction = direction
            return state
        },
        setPersonPosition(state, { key, position }){
            let person = state.persons[key]
            person.rect.x = position.x
            person.rect.y = position.y
            return state
        },
        setPersonAttackTarget(state, { personKey, targetKey }) {
            let person = state.persons[personKey]
            person.targetKey = targetKey
            return state
        },
        setPersonDead(state, { key }) {
            console.log('Set person dead: ' + key);
            state.persons[key].dead = true
            return state
        }
    },
    getters: {
        getPersonById(state, { key }) {
            let person = state.persons[key];
            if (person.dead) return
            return person
        },
        getAllPersons(state) {
            return flatten(Object.keys(state.persons || {}).map(key => {
                return state.persons[key] || []
            })).filter(p => !p.dead)
        },
        getAllEnemies(state, { clientId }) {
            return flatten(Object.keys(state.persons || {}).map(key => {
                return state.persons[key] || []
            })).filter(p =>
                p.clientId !== clientId
                && !p.dead
            )
        }
    }
}

function flatten(list) {
    return list.reduce(
        (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
    );
}