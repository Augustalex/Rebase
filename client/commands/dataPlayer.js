let DEBUG = process.env.DEBUG_ON

module.exports = function (query) {
    let commands = {
        movePlayer(state, { x, y }){
            let player = query.userPlayer
            
            if(x) {
                player.rect.x = x
            }
            if(y){
                player.rect.y = y
            }
            return state
        }
    }
    
    commands.prefix = 'game:'
    return commands
}