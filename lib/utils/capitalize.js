'use strict'

function capitalize(s) {
  if (typeof s !== 'string') { return '' }
  return s && s[0].toUpperCase() + s.slice(1)
}

module.exports = capitalize
