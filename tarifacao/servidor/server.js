
const express = require('express')
const cors = require('cors')
const loadSettings = require('./utils').loadSettings
const app = express()
const port = 3000

app.use(cors())

const inicioContagem = new Date()

const applications = loadSettings()

for (const application of applications) {
    app.all('/count/' + application.code, () => {
        application.requestCount ++
    })
}

app.get('/tarifacao/cliente', (req, res) => {
    // decode JWT and return according to oid
    res.json({ inicioContagem: 10.40, acumulado: 20.45, precoPorRequisicao: 0.2 })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})