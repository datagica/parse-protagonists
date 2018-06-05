function hasRepeatingWords(arr) {
  const tmp = {}
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i].trim().toLowerCase()
    if (tmp[key]) { return true }
    tmp[key] = true
  }
  return false
}

module.exports = hasRepeatingWords
