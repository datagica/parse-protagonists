
/**
 * Remove *some* punctuation
 *
 * The trick is is to NOT remove ALL punctuation:
 * we want to love "bad" punctuation at the beginning and in the middle of a
 * word so that it is detected at a latter step of the analysis.
 *
 * Trust me, that's what we want.
 */

const punctuation = /(?:'s|['"\.,;:&!?\)\(]+)$/gi

function removePunctuation(input) {
  return input.replace(punctuation, "")
}

module.exports = {
  punctuation: punctuation,
  removePunctuation: removePunctuation
}
