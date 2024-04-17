const fs = require('fs')

exports.readFile = (filename) => JSON.parse(fs.readFileSync('./' + filename, {encoding: 'utf8'}))