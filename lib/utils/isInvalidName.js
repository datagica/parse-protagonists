'use strict'

// huge pattern of utf-8 letters valid for use in a name
const letters = require('./letters')

// a name whose characters are repeated over 3 times is *very* dubious
const repeatingLetters = new RegExp(/(.)\1{2,}/)
const invalidChar      = new RegExp(`(?:[^${letters}])`)

function tooSmall(word) {
  return word.length < 2
}

function isInvalidName(word) {

  // word = typeof word === 'string' ? word : ''+word
  if (tooSmall(word)) { return true }

  if (word.match(repeatingLetters)) { return true }

  const isInvalid = word.match(invalidChar)

  if (isInvalid) {
    // allow for - and ' as long as it is INSIDE the name
    if (
      (isInvalid[0] === '-' || isInvalid[0] === "'")
      && isInvalid.index > 0 && isInvalid.index <= word.length) {
      // Now we need ot check if the dash is indeed part of the name and is valid
      // for instance, "Mouton-Rothschild" is valid but "Mouton-" is not.
      const pieces = word.split(isInvalid[0])
      if (pieces.length !== 2 || !(pieces[0].length && pieces[1].length)) { return true }

      if (pieces[0].match(invalidChar)) { return true }
      if (pieces[1].match(invalidChar)) { return true }

      return false
    }
    return true
   }
  return false
}

module.exports = {
  repeatingLetters: repeatingLetters,
  isInvalidName: isInvalidName
}
