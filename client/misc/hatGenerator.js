/**
 * Created by josef on 7/16/17.
 */

module.exports = {
    generateHat
}

function generateHat(origW, origH) {
    let hatDetails = []
    let hatBase = bases[0]// bases[Math.floor(Math.random() * bases.length)]
    let baseColor = {
        r: Math.min(255, hatBase.baseColor.r - 30 + Math.round(60 * Math.random())),
        g: Math.min(255, hatBase.baseColor.g - 20 + Math.round(30 * Math.random())),
        b: Math.min(255, hatBase.baseColor.b - 20 + Math.round(30 * Math.random()))
    }

    for (let detailIndex in hatBase.details) {
        let result = Object.assign({}, hatBase.details[detailIndex])

        if (!hatBase.details[detailIndex].color)
            result.color = baseColor
        else
            result.color = hatBase.details[detailIndex].color

        hatDetails.push(result)
    }

    return hatDetails
}

let bases = [{
    baseColor: {
        r: 209,
        g: 51,
        b: 52
    },
    details: [
        {
            color: [255,0,0],
            relX: -4,
            relY: -4,
            w: 18,
            h: 5
        },
        {
            color: [120,30,205],
            relX: 1,
            relY: -12,
            w: 8,
            h: 8
        }
    ]
}]