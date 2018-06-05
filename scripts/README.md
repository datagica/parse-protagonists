Methodology:


`@datagica/parse-protagonists` works by identifying firstnames from a whitelist
(using `@datagica/parse-names`) then applying some heuristics to the words
after to identify the family name, using a black list.

This blacklist is the list of words commonly founds after a firstname
(eg. the word "said", as in "john said that..").

It means that in this blacklist, you won't find words such as "snow" or "sand",
because these words are not usually present after a firstname.

To get a better blacklist, we need to train our model on cultural documents.
Ideally, these should be from a large range of domains (eg. history books, newspapers,
novels, educational books, research papers..)

we can also use a pre-made list:
http://www.lexique.org/listes/liste_mots.php

but there is the risk that a word is blacklisted (eg. "dupont")
so that would be a lot of cleanup by hand..


To find free TXT books we can use:
https://tools.wmflabs.org/wsexport/tool/book.php

here are the steps to follow:

1. edit step1-process.js carefully
2. node step1-process.js  > words.json
3. node step2-findnews.js > news.json
4. node step3-merge.js    > merge.json

Finally, review merge.json and use it to replace  @datagica/parse-protagonists/lib/forbidden-lastnames.json


*remove lastname-looking words (eg lastnames followed by: 's )
