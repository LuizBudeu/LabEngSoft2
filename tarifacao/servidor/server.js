
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const loadSettings = require('./utils').loadSettings
const getOid = require('./utils').getOid
require('dotenv').config()

const app = express()
const port = 3000

if (process.env.MODE === 'DEV')
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(cookieParser())

const countStart = (new Date()).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
})

const applications = loadSettings()

for (const application of applications) {
    app.all('/count/' + application.code, (req, res) => {
        application.requestCount++
        res.send('count')
    })
}

app.get('/tarifacao/cliente', (req, res) => {
    const requestOid = getOid(req.cookies.access_token)
    const application = applications.find(application => application.oid === requestOid)
    res.json({
        countStart,
        accumulatedPrice: application.requestCount * application.pricePerRequest,
        pricePerRequest: application.pricePerRequest
    })
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})