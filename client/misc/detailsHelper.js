/**
 * Created by josef on 7/16/17.
 */

let hatGenerator = require('./hatGenerator.js')
let clothesGenerator = require('./clothesGenerator.js')

module.exports = {
    createFlag,
    createHat,
    Clothes

}

function createFlag(color, origW, origH) {
    return [{
        relX: (origW / 2) - 5,
        relY: (origH / 2) - 5,
        w: 2,
        h: 10,
        color:[0, 0, 0]
    },
    {
        relX: (origW / 2) - 3,
        relY: (origH / 2) - 5,
        w: 8,
        h: 6,
        color: color
    }]
}

function createHat(origW, origH) {
    return hatGenerator.generateHat(origW, origH)
}

function createClothes(origW, origH){
    return clothesGenerator.generate(origW, origH)
}