'use strict'

function cleanNationality(txt){
  return txt.split(/ (?:et|and|y) /gi).map(i => i.trim())
}

module.exports = cleanNationality
