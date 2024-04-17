
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/tarifacao/cliente', (req, res) => {
    res.json({ acumuladoMesAtual: 10.40, acumuladoMesPassado: 20.45, precoPorRequisicao: 0.2 });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})