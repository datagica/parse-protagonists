// basic heuristic rejecting first names ending in 's or s'
// feel free to change this if you have a better idea
const passiveForm = new RegExp(/(?:'s|s')?$/gi)
function isPassiveForm(txt) {
  return txt.match(passiveForm)[0]
}



module.exports = {
  passiveForm: passiveForm,
  isPassiveForm: isPassiveForm
}
