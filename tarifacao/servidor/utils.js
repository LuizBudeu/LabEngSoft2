const fs = require('fs')

exports.loadSettings = () => JSON.parse(fs.readFileSync('./settings.json', { encoding: 'utf8' }))

exports.getOid = token => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).oid