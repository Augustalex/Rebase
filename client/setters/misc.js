module.exports = {
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
}