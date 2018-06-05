const sentenceEndingPattern = /(?:\.|,|;|:|!|\?)$/i

function hasEndingPunctuation(word) {
  const res = (''+word).match(sentenceEndingPattern)
  return res && res[0] ? true : false
}


module.exports = {
  sentenceEndingPattern: sentenceEndingPattern,
  hasEndingPunctuation: hasEndingPunctuation
}
