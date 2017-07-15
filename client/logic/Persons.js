module.exports = function (deps) {

    let store = deps.store
    let setColor = deps.setColor

    return {
        run,
        draw
    }

    function run(delta) {
        let persons = store.selector.getAllPersons()
        let clientId = store.selector.getClientId()
        let enemies = persons.filter(p => p.clientId !== clientId)
        for (let person of persons) {
            if (enemies.length) {
                let target = enemies[Math.floor(enemies.length * Math.random())]
                store.actions.personAttack({
                    
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
            direction: Math.random() * Math.PI * 2
        });
        store.actions.adjustPersonPosition({
            clientId: person.clientId,
            personId: person.id,
            position: { x: person.rect.x, y: person.rect.y }
        })
    }

    function move(person, delta) {
        person.rect.x += person.speed * delta * Math.cos(person.direction)
        person.rect.y += person.speed * delta * Math.sin(person.direction)
    }
}
