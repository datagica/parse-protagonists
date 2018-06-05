# Parse Protagonists

*Extracts protagonists from text*

In case of false positive or negative you can create a pull request

## Installation

    $ npm i @datagica/parse-protagonists

## Usage

Example:

```javascript
await parse("Antoine de Mérignac")
// result:
[
  {
    "ngram": "Antoine de Mérignac",
    "value": {
      "id": "antoine-de-mérignac",
      "firstname": "antoine",
      "lastname": "de mérignac",
      "label": {
        "en": "Antoine DE MÉRIGNAC"
      },
      "culture": ["french"],
      "gender": ["m"]
    },
    "score": 1,
    "position": {
      "sentence": 0,
      "word": 0,
      "begin": 0,
      "end": 19
    }
  }
]

await parse("Sir Arthur Ignatius Conan Doyle fffff James bond")
// result:
[
  {
    "ngram": "Sir Arthur Ignatius Conan Doyle",
    "value": {
      "id": "arthur-ignatius-conan-doyle",
      "firstname": "arthur",
      "lastname": "ignatius conan doyle",
      "label": {
        "en": "Arthur IGNATIUS CONAN DOYLE"
      },
      "culture": [
        "english", "welsh mythology"
      ],
      "gender": ["m"],
      "title": "sir" // <--- the title is detected too!
    },
    "score": 1,
    "position": {
      "sentence": 0,
      "word": 0,
      "begin": 0,
      "end": 31
    }
  }, {
    "ngram": "James bond",
    "value": {
      "id": "james-bond",
      "firstname": "james",
      "lastname": "bond",
      "label": {
        "en": "James BOND"
      },
      "culture": [
        "english", "biblical"
      ],
      "gender": ["m"]
    },
    "score": 1,
    "position": {
      "sentence": 0,
      "word": 6,
      "begin": 38,
      "end": 48
    }
  }
]
```

## Accidental list of puns

Some funny combinations of valid first name + last names are currently
listen in `lib/forbidden-combos.json`. In the future, we might add a
parameter to allow them.

A sample:

- pierre de la montagne
- silver toyota
- alexa rank
- urban apparel

