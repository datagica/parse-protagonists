
// some honorific titles: Mr, Miss..
const honorifics = require('./honorifics.json')

/**
 * Extract the honorific title and its gender
 */
function getHonorificTitle(word) {
  if (typeof word !== 'string' || !word) { return null }
  const title   = word.toLowerCase().trim()
  const gender = honorifics[title]
  return gender ? {
    title : title,
    gender: gender
  } : null
}


module.exports = {
  honorifics: honorifics,
  getHonorificTitle: getHonorificTitle
}
