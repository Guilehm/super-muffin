const sharp = require('sharp')
const smartcrop = require('smartcrop-gm')


const VALID_FITS = ['cover', 'contain', 'fill', 'inside', 'outside']


class CropService {

    constructor(cropUrl, img, width, height, fit = null) {
        this.cropUrl = cropUrl
        this.img = img
        this.width = parseInt(width)
        this.height = parseInt(height)
        this.fit = VALID_FITS.includes(fit) ? fit : 'cover'
    }

    makeCrop() {
        if (this.fit === 'smartcrop') {
            return this._smartcrop()
        } else {
            return this._crop()
        }
    }

    _crop() {
        return sharp(this.img)
            .resize({ width: this.width, height: this.height, fit: this.fit })
            .toBuffer()
    }

    async _smartcrop() {
        const cropPositions = await smartcrop.crop(this.img)

        const { x, y } = cropPositions.topCrop
        const { width: toCropWidth, height: toCropHeight } = cropPositions.topCrop
        const width = this.width || toCropWidth
        const height = this.height || toCropHeight

        return sharp(this.img)
            .extract({ width: toCropWidth, height: toCropHeight, left: x, top: y })
            .resize({ width, height })
            .toBuffer()
    }
}


module.exports = CropService
