
const express = require('express')
const cors = require('cors')
const loadSettings = require('./utils').loadSettings
const getOid = require('./utils').getOid
const app = express()
const port = 3000

app.use(cors())

const countStart = new Date()

const applications = loadSettings()

for (const application of applications) {
    app.all('/count/' + application.code, () => {
        application.requestCount++
    })
}

app.get('/tarifacao/cliente', (req, res) => {
    const requestOid = getOid(req.get('access_token'))
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