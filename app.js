const Express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')


const app = new Express()

app.use(morgan('short'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const cropController = require('./controllers/crop-controller')
app.get('/api/crop/', cropController)

const PORT = process.env.PORT || 4000
const DEBUG = process.env.DEBUG || 1

app.listen(PORT, () => {
    const message = parseInt(DEBUG) ? 'Starting development server on port' : 'App listening on port'
    logger.info(`${message} ${PORT}`)
})

