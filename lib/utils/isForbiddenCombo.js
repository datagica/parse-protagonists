
'use strict'

// combos that look too much like puns are ignored: "Ping PONG", "Price TAG"..
// because we can suppose nobody will dare name their children like that
const forbiddenCombo = require('./forbidden-combos.json')

function isForbiddenCombo (combo) {

  if (typeof combo !== 'string') { return true }

  combo = combo.toLowerCase().trim()

  if (!combo) {  return true }

  return forbiddenCombo[combo]
}

module.exports = { forbiddenCombo, isForbiddenCombo }
