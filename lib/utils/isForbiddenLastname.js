'use strict'

const isInvalidName = require('./isInvalidName').isInvalidName

const forbiddenLastnames  = require('./forbidden-lastnames.json')

/**
 * we use a blacklist to filter out lastnames that make no sense
 * such as verbs, plural etc. ("r", "interference", "spreadsheet"..)
 */
function isForbiddenLastname(word) {
  
  if (typeof word !== 'string') { return true }

  word = word.toLowerCase().trim().replace(/^[stcmn]?'/,"")

  if (!word)               { return true }
  if (isInvalidName(word)) { return true }

  return forbiddenLastnames[word]
}

module.exports = {
  forbiddenLastnames: forbiddenLastnames,
  isForbiddenLastname: isForbiddenLastname
}
