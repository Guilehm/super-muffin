const axios = require('axios')

const CropService = require('../services/crop-service')
const logger = require('../utils/logger')


module.exports = async (req, res) => {
    const { url, width, height, fit } = req.query

    let img
    try {
        const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' })
        img = response.data
    } catch (error) {
        return res.status(error.response.status).json({ error: error.message })
    }

    const handleCropSuccess = crop => {
        res.writeHead(200, { 'Content-Type': 'image/png' })
        return res.end(crop, 'binary')
    }

    const handleCropError = error => {
        logger.error(`Error while trying to crop ${url}. ${error.message}`)
        return res.status(500).json({ error: error.message })
    }

    const service = new CropService(url, img, width, height, fit)
    service.makeCrop()
        .then(handleCropSuccess)
        .catch(handleCropError)
}
