/**
 * Created by josef on 7/16/17.
 */

module.exports = {
    createFlag
}

function createFlag(color) {
    return [{
        relX: 10,
        relY: 5,
        w: 2,
        h: 10,
        color:[0, 0, 0]
    },
    {
        relX: 12,
        relY: 7,
        w: 10,
        h: 5,
        color: color
    }]
}