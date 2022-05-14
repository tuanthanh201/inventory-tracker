const areTagArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  const len = arr1.length
  for (let i = 0; i < len; i++) {
    if (arr1[i].content !== arr2[i].content) {
      return false
    }
  }
  return true
}

module.exports = { areTagArraysEqual }
