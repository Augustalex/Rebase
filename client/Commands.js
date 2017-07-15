let playerCommands = require('./commands/player.js')

module.exports = function () {
    let commands = {}
    playerCommands.forEach(key => {
        if(key === 'prefix') return
        
        let compositeKey = `${playerCommands.prefix}:${key}`
        commands[compositeKey] = playerCommands[key]
    })
    return commands
}
