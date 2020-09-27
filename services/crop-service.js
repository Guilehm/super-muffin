const sharp = require('sharp')
const smartcrop = require('smartcrop-gm')

const logger = require('../utils/logger')


const VALID_FITS = ['cover', 'contain', 'fill', 'inside', 'outside']


class CropService {

    constructor(cropUrl, img, width, height, fit = null) {
        this.cropUrl = cropUrl
        this.img = img
        this.width = parseInt(width)
        this.height = parseInt(height)
        this.fit = VALID_FITS.includes(fit) ? fit : 'cover'
    }

    crop() {
        logger.info(`Cropping ${this.cropUrl}`)
        return sharp(this.img)
            .resize({ width: this.width, height: this.height, fit: this.fit })
            .toBuffer()
    }

    async smartcrop() {
        logger.info(`Smart cropping ${this.cropUrl}`)
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
