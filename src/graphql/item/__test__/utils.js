const sameImage = (img1, img2) => {
  return (
    img1 === img2 ||
    (img1 === null && img2 === '') ||
    (img2 === null && img1 === '')
  )
}

const areItemsEqual = (item1, item2) => {
  const keys = ['name', 'quantity', 'description', 'image']
  for (const key of keys) {
    if (item1[key] !== item2[key]) {
      if (key === 'image' && sameImage(item1[key], item2[key])) {
        continue
      }
      return false
    }
  }
  return true
}

const areItemArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  const len = arr1.length
  for (let i = 0; i < len; i++) {
    if (!areItemsEqual(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
}

module.exports = {
  areItemsEqual,
  areItemArraysEqual,
}
