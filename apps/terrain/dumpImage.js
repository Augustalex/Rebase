
let PNGImage = require("pngjs-image")

function dumpImage(pixels) {
	let w = pixels.w
	let h = pixels.h
	let image = PNGImage.createImage(w, h)

	for(let i = 0; i < w * h; i++) {
		let x = i % w
		let y = Math.floor(i / w)
		let pixel = pixels.m[i]

		image.setAt(x, y, {
			red: pixel.color.r,
			green: pixel.color.g,
			blue: pixel.color.b,
			alpha: 255,
		})
	}
	/*
	pixels.foreach((x, y, pixel) => {
		image.setAt(x, y, {
			red: pixel.color.r,
			green: pixel.color.g,
			blue: pixel.color.b,
			alpha: 255,
		})
	})
	*/
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
