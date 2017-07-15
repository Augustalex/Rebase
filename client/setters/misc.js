module.exports = {
    addPerson(state, person) {
        let id = `${person.clientId}:${person.id}`
        console.log('addPerson', person)
        state.persons[id] = person
        return state
    },
    setPersonWalkParameters(state, { key, startedWalking, walkTime, direction }){
        let person = state.persons[key]
        console.log('setPersonWalkParameters', person)
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
    }
}