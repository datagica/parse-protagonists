'use strict'

/**
 * We use the low-level FastIndex API in order to perform synchronous search
 *
 */
const FastIndex = require('@datagica/fast-index')
const Tokenize  = require('@datagica/tokenize')

const FirstnameList = require('@datagica/parse-names/lib/database')
const RoleList      = require('@datagica/parse-roles/lib/roles')
const EventList     = require('@datagica/parse-events/lib/events')

const { ParseDates } = require('@datagica/parse-dates')
const parseDates = new ParseDates()

const { isCommonWord }        = require('./utils/isCommonWord')
const { isInvalidName }       = require('./utils/isInvalidName')
const { isPassiveForm }       = require('./utils/isPassiveForm')
const { hasEndingPunctuation } = require('./utils/hasEndingPunctuation')
const { isForbiddenLastname }  = require('./utils/isForbiddenLastname')
const { isForbiddenFirstname } = require('./utils/isForbiddenFirstname')
const { isForbiddenCombo }     = require('./utils/isForbiddenCombo')

const { getHonorificTitle }   = require('./utils/getHonorificTitle')
const { removePunctuation }   = require('./utils/removePunctuation')

const hasRepeatingWords    = require('./utils/hasRepeatingWords')
const capitalize           = require('./utils/capitalize')
const cleanNationality     = require('./utils/cleanNationality')

// KEEP words in a lastname UNTIL they get "bad"
// eg. "bilcke is searching" => "bilcke"
function keepLastNameWhileValid(arr) {
  const isArray = Array.isArray(arr)
  arr = isArray ? arr : arr.split(' ')
  arr = arr.map(name => removePunctuation(name))
  let res = []

  for (var i = 0; i < arr.length; i++) {

    const w1 = arr[i].toLowerCase()
    const w2 = arr[i+1] ? arr[i+1].toLowerCase() : null
    const w3 = arr[i+2] ? arr[i+2].toLowerCase() : null

    let check = true
    // filter particles like "ALEXANDRE DE MERIGNAC"
    if (w1 === "de" || w1 === "del" || w1 == "du") {
      if (w2 === "le" || w2 === "la") {
        if (!isForbiddenLastname(w3)) {
          check = false
        } else {
          break
        }
      } else if (!isForbiddenLastname(w2)) {
        check = false
      } else {
        break
      }
    }  else if (w1 === "le" || w1 == "la") {
      if (!isForbiddenLastname(w2)) {
        check = false
      } else {
        break
      }
    }


    if (check) {
      if (isForbiddenLastname(w1)) { break }
    }

    res.push(w1)
    if (hasEndingPunctuation(w1)) { break }
  }
  // res = res.map(name => name.replace(/(?:'s|\.|,|;|:|!|\?)$/gi,""))
  return isArray ? res : res.join(' ')
}


/**
 * Important algorithm that performs the name sequencing
 */
function keepFirstAndLastWhileValid(arr) {

  if (arr.length === 0) { return [] }

  // for the first word, passive / possessive form is a bad presage
  if (isPassiveForm(arr[0])) { return [] }

  const cleanedWords = []
  for (var i = 0; i < arr.length; i++) {

    const wordWithMaybePunctuation = arr[i]

    // we remove acceptable punctuation (eg. dot at the end)
    const wordWithoutPunctuation = removePunctuation(wordWithMaybePunctuation)

    // we reject the rest (eG. dots inside words)
    if (isInvalidName(wordWithoutPunctuation)) { break }

    // word is OK!
    cleanedWords.push(wordWithoutPunctuation)

    // but wait if there is a dot or something we stop here thought
    if (hasEndingPunctuation(wordWithMaybePunctuation)) { break }
  }
  return cleanedWords
}

class Parser {

  parseSentence ({
      sentence,   // the chunk (ie. the actual piece of text)
      positions,  // global positions of sentences, words, characters
      results     // buffer to collect the results
    }) {

       // split the name into words using only spaces and/or line returns
      // (because some text may have accidental line return and that's okay)
      const words = sentence.split(/[ \r\n]/g)

      // nothing to do if this thing is empty right
      if (sentence.trim() === "") { return }

      const lastWordPosition = positions.word

      let match

      for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {

        positions.word = lastWordPosition + wordIndex + 1

        // basic pre-filtering
        if (words[wordIndex].trim() === "") { continue }

        // try to detect the title in the first word
        const title = getHonorificTitle(words[wordIndex])

        // the main algorithm to extract a legit-looking name sequence
        const curatedWords = keepFirstAndLastWhileValid(
          words.slice(
            wordIndex + (title ? 1 : 0), // also yeah we skip the title at this point
            wordIndex + 5 // hardcoded rule: a name cannot be more than 5 words
          )
        )

        if (curatedWords.length < 1) { continue }

        // if we want first name and lastname
        if (this.lastNameIsMandatory && curatedWords.length < 2) {  continue }

        // ok so here, maybe we could remove this part
        // what it does is to reject name sequences with the same word coming
        // twice
        // if (hasRepeatingWords(words)) { continue }

        // fuse all "clean" words together - not forgetting the title
        // (this isn't very pretty, I know)
        const names = (title ? `${words[wordIndex]} ` : '') + curatedWords.join(' ').toLowerCase()

        const maybeFirstname = this.firstnames.get(curatedWords[0])
        if (maybeFirstname.length == 0) { continue }

        const result = {}

        const firstName = maybeFirstname[0].value
        result.firstname = firstName.name.toLowerCase().trim() // need to normalize here


        // sorry, for the moment there is a list of firstnames we are unable to process
        if (isForbiddenFirstname(result.firstname)) { continue }

        let pFirstName = names.indexOf(result.firstname.toLowerCase())
        if (pFirstName >= 0) {
          const lastNameMaybeSomewhereHere = names.slice(pFirstName + result.firstname.length).trim()
          result.lastname = keepLastNameWhileValid(lastNameMaybeSomewhereHere)
        } else {
          result.lastname = ""
        }

        // accidental puns such "Ping PONG", "Silver TOYOTA" or "Price TAG"
        if (isForbiddenCombo(`${result.firstname} ${result.lastname}`)) {
          continue
        }

        // if the user asked for a mandatory lastname
        if (this.lastNameIsMandatory && result.lastname.length < 2) {
          continue
        }

        const isAmbiguousFirstname = isCommonWord(result.firstname)


        // even if the lastname isn't mandatory, we still ignore firstname if they are too common
        if (isAmbiguousFirstname && result.lastname.length < 2) {
          continue
        }

        // patterns such as "april rain" or "april" cannot be handled for the moment
        if (isAmbiguousFirstname && (isCommonWord(result.lastname) || result.lastname.length < 2)) {
          continue
        }

        const prettyLabel = `${capitalize(result.firstname)}${result.lastname ? ' ' + result.lastname.toUpperCase() : ''}`

        result.label = {
          en: prettyLabel
        }

        result.id = this.opts.useFirstNameAsId
          ? result.firstname.toLowerCase().trim()
          : result.label && result.label.en
            ? result.label.en.toLowerCase().replace(/ /gi, '-').trim()
            : ''

        result.culture = firstName.culture
        result.gender  = firstName.gender

        // title has priority to establish gender
        // why? because Carol, Robin, Jordan, Taylor etc.. are unisex
        // while "mr jordan", "miss jordan" give the hint about the gender
        if (title) {
          result.title  = title.title
          result.gender = title.gender
        }

        let pLastName = Math.max(0, names.indexOf(result.lastname.toLowerCase()))

        // note: here we assume the last name comes in last
        const pEnd = (

          pFirstName > pLastName

            ? pFirstName + result.firstname.length
            : pLastName  + result.lastname.length
        )

        // compute the head
        // (number of characters before the block + one final space)
        const head = words.slice(0, wordIndex).join(' ').length

        // we add the count for one space (except if we are at the beginning)
        const countSpace = wordIndex ? 1 : 0

        const begin = head +        countSpace
        const end   = head + pEnd + countSpace

        // the rest (the actual ngram)
        const rest = sentence.slice(begin, end)

        results.push({
          ngram: rest,
          value: result,
          score: 1,
          position: {
            sentence: positions.sentence,
            word: lastWordPosition + wordIndex,
            begin: positions.character + begin,
            end: positions.character  + end
          }
        })

        // ok here comes a real trick:
        // we move the word index cursor to jump over all the matched words,
        // but we stop just right before entering the unknown area (the rest of
        // the sentence)
        wordIndex += Math.max(1, rest.split(' ').length - 1)

      }
    }

  constructor(opts) {

    opts = typeof opts !== 'undefined' ? opts : {}

    this.opts = opts

    this.lastNameIsMandatory = typeof opts.lastNameIsMandatory === 'boolean' ? opts.lastNameIsMandatory : true
    this.useFirstNameAsId    = typeof opts.useFirstNameAsId    === 'boolean' ? opts.useFirstNameAsId    : false

    this.tokenize = Tokenize()

    this.firstnames = new FastIndex({
      fields: ['name'],
      maxLength: 1,
      removeAccents: false,
      removeNonWord: false,
      spellings: (map, name) => {}
    }).loadSync(FirstnameList)
  }

  parse(input) {
    return Promise.resolve(this.tokenize(input, this.parseSentence.bind(this), []))
  }
}

const singletonInstance = new Parser()
const singletonMethod = function() {
  return singletonInstance.parse.apply(singletonInstance, arguments)
}

module.exports = singletonMethod
module.exports.default = singletonMethod
module.exports.parser = singletonInstance
module.exports.Parser = Parser
