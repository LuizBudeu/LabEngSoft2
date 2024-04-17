
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const inicioContagem = new Date()

app.all('/count', () => {
    request_count++
})

app.get('/tarifacao/cliente', (req, res) => {
    res.json({ inicioContagem: 10.40, acumulado: 20.45, precoPorRequisicao: 0.2 })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})