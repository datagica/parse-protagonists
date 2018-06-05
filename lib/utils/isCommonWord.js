
// common words that should not be in the same text twice
// example: "Pat Downs", "Silver Toyota"..
// these are all valid firstnames and lastnames, but taken together they look
// like puns
const commonWords = require('./common-words.json')

function isCommonWord(txt) {
  let match = false
  txt.split(' ').forEach(word => {
    word = word.toLowerCase()
    if (commonWords[word]) {
      match = true
    }
  })
  return match
}

module.exports = {
  commonWords: commonWords,
  isCommonWord: isCommonWord
}
