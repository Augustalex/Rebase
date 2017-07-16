/**
 * Created by josef on 7/16/17.
 */

module.exports = {
    generate,
    generatePantsColor
}

function generate(shirtColor, origW, origH) {
    let pantsColor = generatePantsColor(bases[Math.floor(Math.random() * bases.length)])
    return [
        {
            relX: 0,
            relY: 3,
            w: origW,
            h: origH / 3,
            color: shirtColor
        },
        {
            relX: 0,
            relY: 8,
            w: origW,
            h: origH / 3,
            color: pantsColor
        }
    ]
}

function generatePantsColor(base) {
    return [
        Math.min(255, base.r - 30 + Math.round(60 * Math.random())),
        Math.min(255, base.g - 20 + Math.round(30 * Math.random())),
        Math.min(255, base.b - 20 + Math.round(30 * Math.random()))
    ]
}

let bases = [
    {r: 91, g: 96, b: 255},
    {r: 127, g: 195, b: 255},
    {r: 217, g: 209, b: 195 },
    {r: 115, g: 85, b: 33 }
]