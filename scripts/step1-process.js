const fs = require('fs')


const FIRSTNAMES = '/Users/jbilcke/Code/datagica/code/parsers/parse-names/lib/database.json'
const LASTNAMES = '/Users/jbilcke/Code/datagica/code/for-intelligence/parse-protagonists/scripts/lastnames.json'

function normalize(x) {
  return `${x}`.trim().toLowerCase()
}
function onlyLettersOrSpaces(x) {
  return x.replace(/[^a-zäöëüïèàâîêûôûôÉáéúóíÆÎÓ \t\r\-]+/ig, " ")
}

const firstnames = {}
require(FIRSTNAMES).forEach(name => (firstnames[normalize(name.name)] = normalize(name.name)))

const lastnames = {};
require(LASTNAMES).forEach(name => (lastnames[normalize(name)] = normalize(name)))


const gameOfThrone = [
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/A Song Of Ice And Fire/got1/001ssb.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/A Song Of Ice And Fire/got2/002ssb.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/A Song Of Ice And Fire/got3/003ssb.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/A Song Of Ice And Fire/got4/004ssb.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/A Song Of Ice And Fire/got5/005ssb.txt'
]

const lordOfTheRing = [
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/TheLordOfTheRings/Book1.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/TheLordOfTheRings/Book2.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/TheLordOfTheRings/Book3.txt'
]

const illiad = [
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/Homer/Iliad/The_Iliad_(Butler).txt'
]

const hugo = [
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/Victor Hugo/miserables/Les_Misérables.txt'
]

const harryPotter = [
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/Harry Potter/azkaban/Prisoner of Azkaban.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/Harry Potter/sorcerer/Sorcerer\'s Stone.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/Harry Potter/goblet-of-fire/The Goblet of Fire.txt',
  '/Users/jbilcke/Dropbox/Shared/datanote-demo/entertainment/Harry Potter/chamber-of-secrets/Chamber of Secrets.txt'
]

const dataset = gameOfThrone;

const stopwords = {}

dataset.forEach(sourceFile => {
  const data = fs
    .readFileSync(sourceFile, 'utf-8')
    .replace(/[^a-zäöëüïèàâîêûôûôÉáéúóíÆÎÓ']+/ig, " ")
    .replace(/ +/ig, " ")
    .split(' ')
    .map(item => normalize(item))
    .filter(item => item);

  for (let i = 0; i < data.length - 1; i++) {
    const firstname = data[i];
    const lastname  = data[i + 1];
    if (firstnames[firstname] && !lastnames[lastname]) {
      stopwords[lastname] = 1 + (stopwords[lastname] || 0)
    }
  }
})

const list = [];
Object.keys(stopwords).map(word => {
  list.push({ word: word, count: stopwords[word] })
})
list.sort((a, b) => b.count - a.count)
list.forEach(item => {
  //console.log(""+item.word+": "+item.count)
})
console.log(JSON.stringify(stopwords, null, 2))
