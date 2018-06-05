const parse = require('./index')
const testData = [
      {
        input: "Summer 1972",
        expected: [] // no result here is good
      }, {
        input: "Jules Ferry-56102 Lorient",
        expected: [] // we currently reject incorrect use of the dash
      }, {
        input: "Silver TOYOTA",
        expected: [] // because probably not an actual person
      }, {
        input: "Ping PONG",
        expected: [] // because probably not an actual person
      }, {
        input: "André-Marie Ampère",
        expected: [] // BUG here we have an issue, this is a bug and we should match!
      }, {
        input: "Alexandre Pierre-Louis",
        expected: [
          {
            "ngram": "Alexandre Pierre-Louis",
            "value": {
              "firstname": "alexandre",
              "lastname": "pierre-louis",
              "label": {
                "en": "Alexandre PIERRE-LOUIS"
              },
              "id": "alexandre-pierre-louis",
              "culture": [
                "french", "portuguese", "hungarian"
              ],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 22
            }
          }
        ]
      }, {
        input: "John doe@email.com",
        expected: []
      }, {
        input: `(je ne suis pas allé asa réunion)`,
        expected: []
      }, {
        input: `Suffren et Duperré, qui se mêle au `,
        expected: []
      }, {
        input: `Jaime l'espagne`,
        expected: []
      }, {
        input: `Antoinette d'Angleterre`,
        expected: [
          {
            "ngram": "Antoinette d'Angleterre",
            "value": {
              "firstname": "antoinette",
              "lastname": "d'angleterre",
              "label": {
                "en": "Antoinette D'ANGLETERRE"
              },
              "id": "antoinette-d'angleterre",
              "culture": ["french"],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 23
            }
          }
        ]
      }, {
        input: "Antoine de Mérignac",
        expected: [
          {
            "ngram": "Antoine de Mérignac",
            "value": {
              "firstname": "antoine",
              "lastname": "de mérignac",
              "label": {
                "en": "Antoine DE MÉRIGNAC"
              },
              "id": "antoine-de-mérignac",
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
      }, {
        input: "Charles de Gaulle",
        expected: [
          {
            "ngram": "Charles de Gaulle",
            "value": {
              "firstname": "charles",
              "lastname": "de gaulle",
              "label": {
                "en": "Charles DE GAULLE"
              },
              "id": "charles-de-gaulle",
              "culture": [
                "english", "french"
              ],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 17
            }
          }
        ]
      }, {
        input: "heureux si ce souvenir me recommande à l’excellence de vos bontés. Le bienfait dont vous m’honorerez sera réciproque. Je suis en posession d’un secret",
        expected: []
      }, {
        input: "Harry Potter.",
        expected: [
          {
            "ngram": "Harry Potter",
            "value": {
              "firstname": "harry",
              "lastname": "potter",
              "label": {
                "en": "Harry POTTER"
              },
              "id": "harry-potter",
              "culture": ["english"],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 12
            }
          }
        ]
      }, {
        input: "Harry. Potter. Harry! Potter! Harry: Potter, Harry, Potter, Harry; Potter",
        expected: []
      }, {
        input: "Sun li",
        expected: []
      }, {
        input: "Li sun", // could be a name
        expected: []
      }, {
        input: "april rain", // could be a name
        expected: []
      }, {
        input: "heavy rain", // could be a name
        expected: []
      }, {
        input: "anna rain", // could be a name
        expected: [
          {
            "ngram": "anna rain",
            "value": {
              "firstname": "anna",
              "lastname": "rain",
              "label": {
                "en": "Anna RAIN"
              },
              "id": "anna-rain",
              "culture": [
                "english",
                "italian",
                "german",
                "dutch",
                "scandinavian",
                "greek",
                "hungarian",
                "polish",
                "russian",
                "czech",
                "bulgarian",
                "icelandic"
              ],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 9
            }
          }
        ]
      }, {
        input: "Summer Summer", // could be a name
        expected: []
      }, {
        input: "Agamemnon Weasley", // could be a name
        expected: [
          {
            "ngram": "Agamemnon Weasley",
            "value": {
              "firstname": "agamemnon",
              "lastname": "weasley",
              "label": {
                "en": "Agamemnon WEASLEY"
              },
              "id": "agamemnon-weasley",
              "culture": ["greek mythology"],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 17
            }
          }
        ]
      }, {
        input: "Jon Snow", // could be a name
        expected: [
          {
            "ngram": "Jon Snow",
            "value": {
              "firstname": "jon",
              "lastname": "snow",
              "label": {
                "en": "Jon SNOW"
              },
              "id": "jon-snow",
              "culture": [
                "scandinavian", "basque", "english"
              ],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 8
            }
          }
        ]
      }, {
        input: "I know what you did last summer miss",
        expected: []
      }, {
        input: "Summer Cornerstone", // could be a name
        expected: [
          {
            "ngram": "Summer Cornerstone",
            "value": {
              "firstname": "summer",
              "lastname": "cornerstone",
              "label": {
                "en": "Summer CORNERSTONE"
              },
              "id": "summer-cornerstone",
              "culture": ["english"],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 18
            }
          }
        ]
      }, {
        input: "Ai Liu", // could be a name too
        expected: [
          {
            "ngram": "Ai Liu",
            "value": {
              "firstname": "ai",
              "lastname": "liu",
              "label": {
                "en": "Ai LIU"
              },
              "id": "ai-liu",
              "culture": [
                "japanese", "chinese"
              ],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 6
            }
          }
        ]
      }, {
        input: "Julian BILCKE recherche",
        expected: [
          {
            "ngram": "Julian BILCKE",
            "value": {
              "firstname": "julian",
              "lastname": "bilcke",
              "label": {
                "en": "Julian BILCKE"
              },
              "id": "julian-bilcke",
              "culture": ["english"],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 13
            }
          }
        ]
      },

      /*{
             input: "Le terroriste, James Name One, a été abattu",
             expected: [{
               "ngram": "Le terroriste, James Name One, a été abattu",
               "value": {
                 "id": "james-name-one",
                 "label": {
                   "en": "James Name One"
                 },
                 "roles": [{
                   "value": {
                     "id": "terrorist",
                     "label": {
                       "en": "Terrorist",
                       "fr": "Terroriste"
                     },
                     "aliases": {
                       "en": [
                         "terrorist",
                         "terrorists"
                       ],
                       "fr": [
                         "terroriste kamikaze",
                         "terroristes kamikazes",
                         "terroriste",
                         "terroristes",
                         "kamikaze",
                         "kamizakes"
                       ]
                     }
                   },
                   "score": 1
                 }],
                 "events": [{
                   "value": {
                     "id": "killed",
                     "label": {
                       "en": "Killed",
                       "fr": "Tué"
                     },
                     "aliases": {
                       "en": [
                         "killed",
                         "dead",
                         "to kill",
                         "his death",
                         "her death",
                         "to death",
                         "murder",
                         "murdered",
                         "murderer",
                         "shot dead",
                         "shot him",
                         "shot her"
                       ],
                       "fr": [
                         "assassiné",
                         "assassinée",
                         "assassine",
                         "assassinee",
                         "tué",
                         "tue",
                         "tuée",
                         "tuee",
                         "tuer",
                         "se tue",
                         "le tue",
                         "l'a tué",
                         "faire tuer",
                         "est mort",
                         "est morte",
                         "abatu",
                         "abbatu",
                         "abattu",
                         "abbattu",
                         "abatue",
                         "abbatue",
                         "abattue",
                         "abbattue",
                         "abatus",
                         "abbatus",
                         "abattus",
                         "abbattus",
                         "abatues",
                         "abbatues",
                         "abattues",
                         "abbattues"
                       ]
                     },
                     "keywords": []
                   },
                   "score": 1
                 }]
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 43
               }
             }]
           },

           {
             // do not collect an non-valid status
             input: "La terroriste, Jane Name Two, foo bar",
             expected: [{
               "ngram": "La terroriste, Jane Name Two, ",
               "value": {
                 "id": "jane-name-two",
                 "label": {
                   "en": "Jane Name Two"
                 },
                 "roles": [{
                   "value": {
                     "id": "terrorist",
                     "label": {
                       "en": "Terrorist",
                       "fr": "Terroriste"
                     },
                     "aliases": {
                       "en": [
                         "terrorist",
                         "terrorists"
                       ],
                       "fr": [
                         "terroriste kamikaze",
                         "terroristes kamikazes",
                         "terroriste",
                         "terroristes",
                         "kamikaze",
                         "kamizakes"
                       ]
                     }
                   },
                   "score": 1
                 }]
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 30
               }
             }]
           }, {
             input: "La victime, John Name Three, a été tuée",
             expected: [{
               "ngram": "La victime, John Name Three, a été tuée",
               "value": {
                 "id": "john-name-three",
                 "label": {
                   "en": "John Name Three"
                 },
                 "roles": [{
                   "value": {
                     "id": "victim",
                     "label": {
                       "en": "Victim",
                       "fr": "Victime"
                     },
                     "aliases": {
                       "en": [
                         "victim",
                         "victims"
                       ],
                       "fr": [
                         "la victime",
                         "les victimes",
                         "victime",
                         "victimes"
                       ]
                     }
                   },
                   "score": 1
                 }],
                 "events": [{
                   "value": {
                     "id": "killed",
                     "label": {
                       "en": "Killed",
                       "fr": "Tué"
                     },
                     "aliases": {
                       "en": [
                         "killed",
                         "dead",
                         "to kill",
                         "his death",
                         "her death",
                         "to death",
                         "murder",
                         "murdered",
                         "murderer",
                         "shot dead",
                         "shot him",
                         "shot her"
                       ],
                       "fr": [
                         "assassiné",
                         "assassinée",
                         "assassine",
                         "assassinee",
                         "tué",
                         "tue",
                         "tuée",
                         "tuee",
                         "tuer",
                         "se tue",
                         "le tue",
                         "l'a tué",
                         "faire tuer",
                         "est mort",
                         "est morte",
                         "abatu",
                         "abbatu",
                         "abattu",
                         "abbattu",
                         "abatue",
                         "abbatue",
                         "abattue",
                         "abbattue",
                         "abatus",
                         "abbatus",
                         "abattus",
                         "abbattus",
                         "abatues",
                         "abbatues",
                         "abattues",
                         "abbattues"
                       ]
                     },
                     "keywords": []
                   },
                   "score": 1
                 }]
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 39
               }
             }]
           },


           {
             input: "Il s'agit de Ted T., franco-américain né le 12 novembre 1982 à New Paris",
             expected: [{
               "ngram": "Ted T., franco-américain né le 12 novembre 1982 à New Paris",
               "value": {
                 "firstname": "ted",
                 "lastname": "t.",
                 "label": {
                   "en": "Ted T."
                 },
                 "id": "ted-t.",
                 "culture": [
                   "english"
                 ],
                 "gender": [
                   "m"
                 ],
                 "nationality": [
                   "franco-américain"
                 ],
                 "birthplace": "New Paris",
                 "age": 34
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 59
               }
             }]
           },
           // we do not to catch unnatural lastname
           {
             input: "This famous economist was Mark Test, american born on September 9, 1950 in Modesto, C.A.",
             expected: []
           }, {
             input: "This famous economist was Mark Tedd, american born on September 9, 1950 in Modesto, C.A.",
             expected: [{
               "ngram": "Mark Tedd, american born on September 9, 1950 in Modesto, C.A.",
               "value": {
                 "firstname": "mark",
                 "lastname": "tedd",
                 "label": {
                   "en": "Mark TEDD"
                 },
                 "id": "mark-tedd",
                 "culture": [
                   "english",
                   "russian",
                   "biblical"
                 ],
                 "gender": [
                   "m"
                 ],
                 "nationality": [
                   "american"
                 ],
                 "birthplace": "Modesto, C.A.",
                 "age": 66
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 62
               }
             }]
           }, {
             input: "de Claude N., franco-italien né le 8 octobre 1994 à Paris,",
             expected: [{
               "ngram": "Claude N., franco-italien né le 8 octobre 1994 à Paris",
               "value": {
                 "firstname": "claude",
                 "lastname": "n.",
                 "label": {
                   "en": "Claude N."
                 },
                 "id": "claude-n.",
                 "culture": [
                   "french",
                   "english"
                 ],
                 "gender": [
                   "m",
                   "f"
                 ],
                 "nationality": [
                   "franco-italien"
                 ],
                 "birthplace": "Paris",
                 "age": 22
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 54
               }
             }]
           }, {
             input: "Il s'agit de Ramzi A., franco-tunisien né le 28 novembre 1994 à Nice," +
               " de Chokri C., Tunisien né le 11 juillet 1979," +
               " d'Artan H., Albanais né le 30 janvier 1978," +
               " de Mohamed Oualid G., franco-tunisien né le 19 février 1976" +
               " et d'Enkeledja Z., née le 3 mars 1974, de nationalité française et albanaise.",
             expected: [{
               "ngram": "Ramzi A., franco-tunisien né le 28 novembre 1994 à Nice",
               "value": {
                 "firstname": "ramzi",
                 "lastname": "a.",
                 "label": {
                   "en": "Ramzi A."
                 },
                 "id": "ramzi-a.",
                 "culture": [
                   "uzbek",
                   "turkish",
                   "arabic"
                 ],
                 "gender": [
                   "m"
                 ],
                 "nationality": [
                   "franco-tunisien"
                 ],
                 "birthplace": "Nice",
                 "age": 22
               },
               "score": 1,
               "position": {
                 "begin": 0,
                 "end": 55
               }
             }, {
               "ngram": "Chokri C., Tunisien né le 11 juillet 1979,",
               "value": {
                 "firstname": "chokri",
                 "lastname": "c.",
                 "label": {
                   "en": "Chokri C."
                 },
                 "id": "chokri-c.",
                 "culture": [
                   "arabic"
                 ],
                 "gender": [
                   "m"
                 ],
                 "nationality": [
                   "Tunisien"
                 ],
                 "age": 37
               },
               "score": 1,
               "position": {
                 "begin": 55,
                 "end": 97
               }
             }, {
               "ngram": "Artan H., Albanais né le 30 janvier 1978,",
               "value": {
                 "firstname": "artan",
                 "lastname": "h.",
                 "label": {
                   "en": "Artan H."
                 },
                 "id": "artan-h.",
                 "culture": [
                   "albanian",
                   "turkish",
                   "gaelic",
                   "iranian",
                   "persian"
                 ],
                 "gender": [
                   "m"
                 ],
                 "nationality": [
                   "Albanais"
                 ],
                 "age": 38
               },
               "score": 1,
               "position": {
                 "begin": 152,
                 "end": 193
               }
             }, {
               "ngram": "Mohamed Oualid",
               "value": {
                 "firstname": "mohamed",
                 "lastname": "oualid",
                 "label": {
                   "en": "Mohamed OUALID"
                 },
                 "id": "mohamed-oualid",
                 "culture": [
                   "arabic"
                 ],
                 "gender": [
                   "m"
                 ]
               },
               "score": 1,
               "position": {
                 "begin": 345,
                 "end": 359
               }
             }, {
               "ngram": "Enkeledja Z., née le 3 mars 1974, de nationalité française et albanaise",
               "value": {
                 "firstname": "enkeledja",
                 "lastname": "z.",
                 "label": {
                   "en": "Enkeledja Z."
                 },
                 "id": "enkeledja-z.",
                 "culture": [
                   "albanian"
                 ],
                 "gender": [
                   "f"
                 ],
                 "nationality": [
                   "française",
                   "albanaise"
                 ],
                 "age": 42
               },
               "score": 1,
               "position": {
                 "begin": 704,
                 "end": 775
               }
             }]
           },
           */
      {

        input: `the great city of King Priam, bring comfort to the Trojans and their women,`,
        expected: []
        // I'm sorry, but now we refuse to count "King Priam" as a valid name
        // however, you can adjust the settings to allow first name matching!
        /*
  {
    "ngram": "King Priam",
    "value": {
      "firstname": "king",
      "lastname": "priam",
      "label": {
        "en": "King PRIAM"
      },
      "id": "king-priam",
      "culture": [
        "english"
      ],
      "gender": [
        "m"
      ]
    },
    "score": 1,
    "position": {
      "sentence": 0,
"word": 4,
      "begin": 18,
      "end": 28
    }
  }*/

      }, {

        input: `
          Then Hector said, "Ajax, heaven has vouchsafed you stature and strength, and judgement; and in wielding the spear you excel all others of the Achaeans. Let us for this day cease fighting; hereafter we will fight anew till heaven decide between us, and give victory to one or to the other; night is now falling, and the behests of night may not be well gainsaid. Gladden, then, the hearts of the Achaeans at your ships, and more especially those of your own followers and clansmen, while I, in the great city of King Priam, bring comfort to the Trojans and their women, who vie with one another in their prayers on my behalf. Let us, moreover, exchange presents that it may be said among the Achaeans and Trojans, 'They fought with might and main, but were reconciled and parted in friendship.'

        On this he gave Ajax a silver-studded sword with its sheath and leathern baldric, and in return Ajax gave him a girdle dyed with purple. Thus they parted, the one going to the host of the Achaeans, and the other to that of the Trojans, who rejoiced when they saw their hero come to them safe and unharmed from the strong hands of mighty Ajax. They led him, therefore, to the city as one that had been saved beyond their hopes. On the other side the Achaeans brought Ajax elated with victory to Agamemnon.

        When they reached the quarters of the son of Atreus, Agamemnon sacrificed for them a five-year-old bull in honour of Jove the son of Saturn. They flayed the carcass, made it ready, and divided it into joints; these they cut carefully up into smaller pieces, putting them on the spits, roasting them sufficiently, and then drawing them off. When they had done all this and had prepared the feast, they ate it, and every man had his full and equal share, so that all were satisfied, and King Agamemnon gave Ajax some slices cut lengthways down the loin, as a mark of special honour. As soon as they had had enough to eat and drink, old Nestor whose counsel was ever truest began to speak; with all sincerity and goodwill, therefore, he addressed them thus:-

        "Son of Atreus, and other chieftains, inasmuch as many of the Achaeans are now dead, whose blood Mars has shed by the banks of the Scamander, and their souls have gone down to the house of Hades, it will be well when morning comes that we should cease fighting; we will then wheel our dead together with oxen and mules and burn them not far from the ships, that when we sail hence we may take the bones of our comrades home to their children. Hard by the funeral pyre we will build a barrow that shall be raised from the plain for all in common; near this let us set about building a high wall, to shelter ourselves and our ships, and let it have well-made gates that there may be a way through them for our chariots. Close outside we will dig a deep trench all round it to keep off both horse and foot, that the Trojan chieftains may not bear hard upon us."

        Thus he spoke, and the princess shouted in applause. Meanwhile the Trojans held a council, angry and full of discord, on the acropolis by the gates of King Priam's palace; and wise Antenor spoke. "Hear me he said, "Trojans, Dardanians, and allies, that I may speak even as I am minded. Let us give up Argive Helen and her wealth to the sons of Atreus, for we are now fighting in violation of our solemn covenants, and shall not prosper till we have done as I say."

        He then sat down and Alexandrus husband of lovely Helen rose to speak. "Antenor," said he, "your words are not to my liking; you can find a better saying than this if you will; if, however, you have spoken in good earnest, then indeed has heaven robbed you of your reason. I will speak plainly, and hereby notify to the Trojans that I will not give up the woman; but the wealth that I brought home with her from Argos I will restore, and will add yet further of my own."

        On this, when Paris had spoken and taken his seat, Priam of the race of Dardanus, peer of gods in council, rose and with all sincerity and goodwill addressed them thus: "Hear me, Trojans, Dardanians, and allies, that I may speak even as I am minded. Get your suppers now as hitherto throughout the city, but keep your watches and be wakeful. At daybreak let Idaeus go to the ships, and tell Agamemnon and Menelaus sons of Atreus the saying of Alexandrus through whom this quarrel has come about; and let him also be instant with them that they now cease fighting till we burn our dead; hereafter we will fight anew, till heaven decide between us and give victory to one or to the other."

        Thus did he speak, and they did even as he had said. They took supper in their companies and at daybreak Idaeus went his wa to the ships. He found the Danaans, servants of Mars, in council at the stern of Agamemnon's ship, and took his place in the midst of them. "Son of Atreus," he said, "and princes of the Achaean host, Priam and the other noble Trojans have sent me to tell you the saying of Alexandrus through whom this quarrel has come about, if so be that you may find it acceptable. All the treasure he took with him in his ships to Troy- would that he had sooner perished- he will restore, and will add yet further of his own, but he will not give up the wedded wife of Menelaus, though the Trojans would have him do so. Priam bade me inquire further if you will cease fighting till we burn our dead; hereafter we will fight anew, till heaven decide between us and give victory to one or to the other."

        They all held their peace, but presently Diomed of the loud war-cry spoke, saying, "Let there be no taking, neither treasure, nor yet Helen, for even a child may see that the doom of the Trojans is at hand."

        The sons of the Achaeans shouted applause at the words that Diomed had spoken, and thereon King Agamemnon said to Idaeus, "Idaeus, you have heard the answer the Achaeans make you-and I with them. But as concerning the dead, I give you leave to burn them, for when men are once dead there should be no grudging them the rites of fire. Let Jove the mighty husband of Juno be witness to this covenant."

        As he spoke he upheld his sceptre in the sight of all the gods, and Idaeus went back to the strong city of Ilius. The Trojans and Dardanians were gathered in council waiting his return; when he came, he stood in their midst and delivered his message. As soon as they heard it they set about their twofold labour, some to gather the corpses, and others to bring in wood. The Argives on their part also hastened from their ships, some to gather the corpses, and others to bring in wood.

        The sun was beginning to beat upon the fields, fresh risen into the vault of heaven from the slow still currents of deep Oceanus, when the two armies met. They could hardly recognise their dead, but they washed the clotted gore from off them, shed tears over them, and lifted them upon their waggons. Priam had forbidden the Trojans to wail aloud, so they heaped their dead sadly and silently upon the pyre, and having burned them went back to the city of Ilius. The Achaeans in like manner heaped their dead sadly and silently on the pyre, and having burned them went back to their ships.

        Now in the twilight when it was not yet dawn, chosen bands of the Achaeans were gathered round the pyre and built one barrow that was raised in common for all, and hard by this they built a high wall to shelter themselves and their ships; they gave it strong gates that there might be a way through them for their chariots, and close outside it they dug a trench deep and wide, and they planted it within with stakes.

        Thus did the Achaeans toil, and the gods, seated by the side of Jove the lord of lightning, marvelled at their great work; but Neptune, lord of the earthquake, spoke, saying, "Father Jove, what mortal in the whole world will again take the gods into his counsel? See you not how the Achaeans have built a wall about their ships and driven a trench all round it, without offering hecatombs to the gods? The The fame of this wall will reach as far as dawn itself, and men will no longer think anything of the one which Phoebus Apollo and myself built with so much labour for Laomedon."

        Jove was displeased and answered, "What, O shaker of the earth, are you talking about? A god less powerful than yourself might be alarmed at what they are doing, but your fame reaches as far as dawn itself. Surely when the Achaeans have gone home with their ships, you can shatter their wall and Ring it into the sea; you can cover the beach with sand again, and the great wall of the Achaeans will then be utterly effaced."

        Thus did they converse, and by sunset the work of the Achaeans was completed; they then slaughtered oxen at their tents and got their supper. Many ships had come with wine from Lemnos, sent by Euneus the son of Jason, born to him by Hypsipyle. The son of Jason freighted them with ten thousand measures of wine, which he sent specially to the sons of Atreus, Agamemnon and Menelaus. From this supply the Achaeans bought their wine, some with bronze, some with iron, some with hides, some with whole heifers, and some again with captives. They spread a goodly banquet and feasted the whole night through, as also did the Trojans and their allies in the city. But all the time Jove boded them ill and roared with his portentous thunder. Pale fear got hold upon them, and they spilled the wine from their cups on to the ground, nor did any dare drink till he had made offerings to the most mighty son of Saturn. Then they laid themselves down to rest and enjoyed the boon of sleep.
        `,

        expected: [
          {
            "ngram": "Phoebus Apollo",
            "value": {
              "firstname": "phoebus",
              "lastname": "apollo",
              "label": {
                "en": "Phoebus APOLLO"
              },
              "id": "phoebus-apollo",
              "culture": ["greek mythology (latinized)"],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 37,
              "word": 24,
              "begin": 8197,
              "end": 8211
            }
          }
        ]
      }, {
        input: `Depuis, deux puissants romanciers, dont l’un est un profond observateur du cœur humain, l’autre un intrépide ami du peuple, Balzac et Eugène Süe, ayant fait parler des bandits dans leur langue naturelle comme l’avait fait en 1828 l’auteur du Dernier jour d’un condamné, les mêmes réclamations se sont élevées. On a répété : — Que nous veulent les écrivains avec ce révoltant patois ? l’argot est odieux ! l’argot fait frémir !`,
        expected: [
          {
            "ngram": "Eugène Süe",
            "value": {
              "firstname": "eugène",
              "lastname": "süe",
              "label": {
                "en": "Eugène SÜE"
              },
              "id": "eugène-süe",
              "culture": ["french"],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 21,
              "begin": 134,
              "end": 144
            }
          }
        ]
      }, {
        input: `Les chiffres diplomatiques sont de l’argot ; la chancellerie pontificale, en disant 26 pour Rome, grkztntgzyal pour envoi et abfxustgrnogrkzu tu XI pour duc de Modène, parle argot. Les médecins du moyen âge qui, pour dire carotte, radis et navet, disaient : opoponach, perfroschinum, reptitalmus, dracatholicum angelorum, postmegorum, parlaient argot. Le fabricant de sucre qui dit : vergeoise, tête, claircé, tape, lumps, mélis, bâtarde, commun, brûlé, plaque, cet honnête manufacturier parle argot. Une certaine école de critique d’il y a vingt ans qui disait : La moitié de Shakespeare est jeux de mots et calembours, — parlait argot. Le poëte et l’artiste qui, avec un sens profond, qualifieront M. de Montmorency « un bourgeois », s’il ne se connaît pas en vers et en statues, parlent argot. L’académicien classique qui appelle les fleurs Flore, les fruits Pomone, la mer Neptune, l’amour les feux, la beauté les appas, un cheval un coursier, la cocarde blanche ou tricolore la rose de Bellone, le chapeau à trois cornes le triangle de Mars, l’académicien classique parle argot. L’algèbre, la médecine, la botanique, ont leur argot. La langue qu’on emploie à bord, cette admirable langue de la mer, si complète et si pittoresque, qu’ont parlée Jean Bart, Duquesne, Suffren et Duperré, qui se mêle au sifflement des agrès, au bruit des porte-voix, au choc des haches d’abordage, au roulis, au vent, à la rafale, au canon, est tout un argot héroïque et éclatant qui est au farouche argot de la pègre ce que le lion est au chacal.`,
        expected: [/*
      Yeah, so.. we disabled that too.. well, we can discuss about it.
  {
    "ngram": "duc de Modène",
    "value": {
      "firstname": "duc",
      "lastname": "de modène",
      "label": {
        "en": "Duc DE MODÈNE"
      },
      "id": "duc-de-modène",
      "culture": [
        "vietnamese"
      ],
      "gender": [
        "m"
      ]
    },
    "score": 1,
    "position": {
      "sentence": 0,
"word": 23,
      "begin": 153,
      "end": 166
    }
  },*/
          {
            "ngram": "rose de Bellone",
            "value": {
              "firstname": "rose",
              "lastname": "de bellone",
              "label": {
                "en": "Rose DE BELLONE"
              },
              "id": "rose-de-bellone",
              "culture": [
                "english", "french"
              ],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 5,
              "word": 30,
              "begin": 983,
              "end": 998
            }
          }
        ]
      }, {
        input: `marius qui est`,
        expected: []
      }, {
        input: `John Smith).`,
        expected: [
          {
            "ngram": "John Smith",
            "value": {
              "firstname": "john",
              "lastname": "smith",
              "label": {
                "en": "John SMITH"
              },
              "id": "john-smith",
              "culture": [
                "english", "biblical"
              ],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 10
            }
          }
        ]
      }, {
        input: `Lara Croft,"`,
        expected: [
          {
            "ngram": "Lara Croft",
            "value": {
              "firstname": "lara",
              "lastname": "croft",
              "label": {
                "en": "Lara CROFT"
              },
              "id": "lara-croft",
              "culture": ["russian"],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 10
            }
          }
        ]
      }, {
        input: `Ann Doyle..`,
        expected: [
          {
            "ngram": "Ann Doyle",
            "value": {
              "firstname": "ann",
              "lastname": "doyle",
              "label": {
                "en": "Ann DOYLE"
              },
              "id": "ann-doyle",
              "culture": ["english"],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 9
            }
          }
        ]
      },  {
        input: `James Bond-`,
        expected: []
      }, {
        input: `James Bond.42`,
        expected:   []
      }, {
        input: `James Bond 42`,
        expected: [
          {
            "ngram": "James Bond",
            "value": {
              "firstname": "james",
              "lastname": "bond",
              "label": {
                "en": "James BOND"
              },
              "id": "james-bond",
              "culture": [
                "english", "biblical"
              ],
              "gender": ["m"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 10
            }
          }
        ]
      }, {
        input: `Sir Arthur Ignatius Conan Doyle`,
        expected: [
          {
            "ngram": "Sir Arthur Ignatius Conan Doyle",
            "value": {
              "firstname": "arthur",
              "lastname": "ignatius conan doyle",
              "label": {
                "en": "Arthur IGNATIUS CONAN DOYLE"
              },
              "id": "arthur-ignatius-conan-doyle",
              "culture": [
                "english", "welsh mythology"
              ],
              "gender": ["m"],
              "title": "sir"
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 0,
              "begin": 0,
              "end": 31
            }
          }
        ]
      }, {
        input: `Sir Arthur Ignatius Conan Doyle fffff James bond`,
        expected: [
          {
            "ngram": "Sir Arthur Ignatius Conan Doyle",
            "value": {
              "firstname": "arthur",
              "lastname": "ignatius conan doyle",
              "label": {
                "en": "Arthur IGNATIUS CONAN DOYLE"
              },
              "id": "arthur-ignatius-conan-doyle",
              "culture": [
                "english", "welsh mythology"
              ],
              "gender": ["m"],
              "title": "sir"
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
              "firstname": "james",
              "lastname": "bond",
              "label": {
                "en": "James BOND"
              },
              "id": "james-bond",
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
      }, {
        input: `Sir Arthur Ignatius Conan Doyle fffff James bond and Jane Doe`,
        expected: [
          {
            "ngram": "Sir Arthur Ignatius Conan Doyle",
            "value": {
              "firstname": "arthur",
              "lastname": "ignatius conan doyle",
              "label": {
                "en": "Arthur IGNATIUS CONAN DOYLE"
              },
              "id": "arthur-ignatius-conan-doyle",
              "culture": [
                "english", "welsh mythology"
              ],
              "gender": ["m"],
              "title": "sir"
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
              "firstname": "james",
              "lastname": "bond",
              "label": {
                "en": "James BOND"
              },
              "id": "james-bond",
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
          }, {
            "ngram": "Jane Doe",
            "value": {
              "firstname": "jane",
              "lastname": "doe",
              "label": {
                "en": "Jane DOE"
              },
              "id": "jane-doe",
              "culture": ["english"],
              "gender": ["f"]
            },
            "score": 1,
            "position": {
              "sentence": 0,
              "word": 9,
              "begin": 53,
              "end": 61
            }
          }
        ]
      }
    ]

    test('extract protagonists', () => Promise.all(
      testData.map(async ({
        input,
        expected
      }) => expect(await parse(input)).toEqual(expected))
    ))