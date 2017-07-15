module.exports = {
    generate,
    variationOnBase
}

function variationOnBase(base) {
    return {
        r: Math.min(255, base.r - 30 + Math.round(60 * Math.random())),
        g: Math.min(255, base.g - 20 + Math.round(30 * Math.random())),
        b: Math.min(255, base.b - 20 + Math.round(30 * Math.random()))
    }
}

function generate() {
    return bases[Math.round(Math.random() * (bases.length - 1))]
}

let bases = [
    { r: 141, g: 85, b: 36 },
    { r: 198, g: 134, b: 66 },
    { r: 224, g: 172, b: 105 },
    { r: 241, g: 194, b: 125 },
    { r: 255, g: 219, b: 172 }
]