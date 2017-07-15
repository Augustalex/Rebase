
let PNGImage = require("pngjs-image")

function dumpImage(pixels) {
	let w = pixels.getW()
	let h = pixels.getH()
	let image = PNGImage.createImage(w, h)

	pixels.foreach((x, y, pixel) => {
		image.setAt(x, y, {
			red: 0,
			green: pixel * 255,
			blue: 0,
			alpha: 255,
		})
	})
	image.writeImage("./dump.png", (err) => {
		if(err) {
			console.log(err)
		}
		else {
			console.log("Image written to dump.png")
		}
	})
}

module.exports = dumpImage
