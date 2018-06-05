
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
