
'use strict'

const { isInvalidName } = require('./isInvalidName')

// using a blacklist of forbidden firstnames we do not have to edit the original
// first names database, and we can un-blacklist an item more easily
const forbiddenFirstnames = require('./forbidden-firstnames.json')

function isForbiddenFirstname(word) {

  if (typeof word !== 'string') { return true }

  word = word.toLowerCase().trim()

  if (!word)               { return true }
  if (isInvalidName(word)) { return true }

  return forbiddenFirstnames[word]
}

module.exports = { forbiddenFirstnames, isForbiddenFirstname }
