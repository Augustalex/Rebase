module.exports = function (deps) {

    let store = deps.store
    let localStore = deps.localStore
    let setColor = deps.setColor
    let drawEntity = deps.drawEntity

    return {
        run,
        draw
    }

    function run(delta) {
        let persons = store.selector.getAllPersons()
        let clientId = store.selector.getClientId()

        for (let person of persons) {
            if (person.dead) {
                console.log('FOUND A DEAD GUY!');
            }
            if ('targetKey' in person) {
                let target
                let action
                if (person.mode === 'attack') {
                    target = store.selector.getPersonById({ key: person.targetKey });
                    action = () => {
                        let won = Math.random() > 0.5

                        let targetClientId = won ? target.clientId : person.clientId
                        let targetId = won ? target.id : person.id
                        store.actions.personKillTarget({
                            targetClientId: targetClientId,
                            targetId: targetId
                        })
                    }
                }
                if (person.mode === 'farm') {
                    target = store.selector.getCornById(person.targetKey)
                    action = () => {
                        console.log('GOT CORN!');
                        store.actions.personHarvestCorn({
                            clientId,
                            personId: person.id,
                            cornId: target.id
                        })
                        delete person['targetKey']
                    }
                }

                if (!target) {
                    delete person['targetKey']
                }
                else {
                    moveAndActOnTarget({
                        person,
                        target,
                        action,
                        delta
                    });
                    return
                }
            }
            else if (clientId === person.clientId) {
                let enemies = persons.filter(p => p.clientId !== clientId)
                if (enemies.length) {
                    let target = pickNewTarget(person, enemies)
                    store.actions.personAttackTarget({
                        clientId: person.clientId,
                        personId: person.id,
                        targetClientId: target.clientId,
                        targetId: target.id
                    })
                    return
                }

                let corn = store.selector.getAllCornByClientId(clientId)
                if (corn.length) {
                    let target = pickNewTarget(person, corn)
                    store.actions.personHarvest({
                        clientId: person.clientId,
                        personId: person.id,
                        targetId: target.id
                    })
                    return
                }
            }
            walk(person, delta)
        }
    }

    function draw() {
        let persons = store.selector.getAllPersons()
        for (let person of persons) {
            drawEntity(person)
        }
    }

    function walk(person, delta) {
        let now = Date.now();
        let elapsedTime = now - person.startedWalking;
        if (elapsedTime > person.walkTime) {
            beginWalk(person, now)
        }
        let x = person.rect.x + person.speed * delta * Math.cos(person.direction)
        let y = person.rect.y + person.speed * delta * Math.sin(person.direction)
        localStore.actions.adjustPersonPosition({
            clientId: person.clientId,
            personId: person.id,
            position: { x, y }
        })
        // store.actions.adjustPersonPosition({
        //     clientId: person.clientId,
        //     personId: person.id,
        //     position: { x: person.rect.x, y: person.rect.y }
        // })
    }

    function beginWalk(person, now) {
        store.actions.walkInDirection({
            clientId: person.clientId,
            personId: person.id,
            startedWalking: now,
            walkTime: Math.round(Math.random() * 10000),
            direction: Math.round(Math.random() * Math.PI * 2 * 1000) / 1000
        });
        localStore.actions.adjustPersonPosition({
            clientId: person.clientId,
            personId: person.id,
            position: { x: person.rect.x, y: person.rect.y }
        })
    }

    function pickNewTarget(person, targets) {
        return targets[Math.floor(targets.length * Math.random())]
    }

    function moveAndActOnTarget({ person, target, action, delta }) {
        let targetPos = target.rect
        let personPos = person.rect
        let direction = Math.atan2(targetPos.y - personPos.y, targetPos.x - personPos.x);

        let x = personPos.x
        let y = personPos.y

        let xDistance = Math.abs(targetPos.x - personPos.x);
        if (xDistance > 5) {
            x = personPos.x + person.speed * delta * Math.cos(direction)
        }

        let yDistance = Math.abs(targetPos.y - personPos.y);
        if (yDistance > 5) {
            y = personPos.y + person.speed * delta * Math.sin(direction)
        }

        if (xDistance <= 5 && yDistance <= 5) {
            action();
        }
        localStore.actions.adjustPersonPosition({
            clientId: person.clientId,
            personId: person.id,
            position: { x, y }
        })
    }
}
