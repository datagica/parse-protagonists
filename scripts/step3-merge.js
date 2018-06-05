const json1 = require('../lib/forbidden-lastnames.json')
const json2 = require('./words.json')

Object.keys(json2).map(key => {
  json1[key] = json2[key] + (json1[key] || 0)
})
console.log(JSON.stringify(json1, null, 2))
