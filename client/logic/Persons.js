module.exports = function (deps) {

    let store = deps.store
    let localStore = deps.localStore
    let setColor = deps.setColor

    let justifyCounter = 0

    return {
        run,
        draw
    }

    function run(delta) {
        let persons = store.selector.getAllPersons()
        let clientId = store.selector.getClientId()

        //This is not a good idea and will be removed once the real problem is resolved..
        if(justifyCounter === 100){
            let yours = persons.filter(p => p.clientId === clientId)
            for(let person of yours) {
                store.actions.adjustPersonPosition({
                    clientId: person.clientId,
                    personId: person.id,
                    position: { x: person.rect.x, y: person.rect.y }
                })
            }
            justifyCounter = 0
        }
        else{
            justifyCounter++
        }

        console.log('n persons', persons.length);

        let enemies = persons.filter(p => p.clientId !== clientId)
        for (let person of persons) {
            if(person.dead){
                console.log('FOUND A DEAD GUY!');
            }
            if ('targetKey' in person) {
                let target = store.selector.getPersonById({ key: person.targetKey });
                if(!target) {
                    delete person['targetKey']
                    return
                }

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
                    console.log('Collided!');
                    let won = Math.random() > 0.5

                    let targetClientId = won ? target.clientId : person.clientId
                    let targetId = won ? target.id : person.id
                    store.actions.personKillTarget({
                        targetClientId: targetClientId,
                        targetId: targetId
                    })
                }
                localStore.actions.adjustPersonPosition({
                    clientId: person.clientId,
                    personId: person.id,
                    position: { x, y }
                })
            }
            else if (enemies.length && clientId === person.clientId) {
                let target = enemies[Math.floor(enemies.length * Math.random())]
                store.actions.personAttackTarget({
                    clientId: person.clientId,
                    personId: person.id,
                    targetClientId: target.clientId,
                    targetId: target.id
                })
            }
            else {
                let now = Date.now();
                let elapsedTime = now - person.startedWalking;
                if (elapsedTime > person.walkTime) {
                    beginWalk(person, now)
                }
                move(person, delta)
            }
        }
    }

    function draw() {
        let persons = store.selector.getAllPersons()
        for (let person of persons) {
            let rect = person.rect;
            let color = person.color;
            setColor({
                r: color[0],
                g: color[1],
                b: color[2]
            });
            ctx.fillRect(rect.x, rect.y, rect.w, rect.h)
        }
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

    function move(person, delta) {
        let x = person.rect.x + person.speed * delta * Math.cos(person.direction)
        let y = person.rect.y + person.speed * delta * Math.sin(person.direction)
        localStore.actions.adjustPersonPosition({
            clientId: person.clientId,
            personId: person.id,
            position: { x, y }
        })
    }
}
