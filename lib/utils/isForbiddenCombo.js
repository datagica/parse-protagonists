
'use strict'

// some names are 100% valid but obviously unrealistic because
// nobody would call their children like that, eg. "Ping PONG", "Price TAG"..
const forbiddenCombo = require('./forbidden-combos.json')

function isForbiddenCombo (combo) {

  if (typeof combo !== 'string') { return true }

  combo = combo.toLowerCase().trim()

  if (!combo) {  return true }

  return forbiddenCombo[combo]
}

module.exports = {
  forbiddenCombo: forbiddenCombo,
  isForbiddenCombo: isForbiddenCombo
}
