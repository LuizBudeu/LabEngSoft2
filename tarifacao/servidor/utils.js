const fs = require('fs')

exports.loadSettings = () => JSON.parse(fs.readFileSync('./settings.json', { encoding: 'utf8' }))