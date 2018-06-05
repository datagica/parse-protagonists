const json1 = require('../lib/forbidden-lastnames.json')
const json2 = require('./words.json')

const newOnes = {}
Object.keys(json2).map(key => {
  if (!json1[key]) {
    newOnes[key] = json2[key] + (newOnes[key] || 0)
  }
})
console.log(JSON.stringify(newOnes, null, 2))
