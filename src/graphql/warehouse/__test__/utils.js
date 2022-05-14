const sameImage = (img1, img2) => {
  return (
    img1 === img2 ||
    (img1 === null && img2 === '') ||
    (img2 === null && img1 === '')
  )
}

const areWarehousesEqual = (warehouse1, warehouse2) => {
  const keys = ['name', 'location', 'description', 'image']
  for (const key of keys) {
    if (warehouse1[key] !== warehouse2[key]) {
      if (key === 'image' && sameImage(warehouse1[key], warehouse2[key])) {
        continue
      }
      return false
    }
  }
  return true
}

const areWarehouseArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  const len = arr1.length
  for (let i = 0; i < len; i++) {
    if (!areWarehousesEqual(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
}

module.exports = {
  areWarehouseArraysEqual,
  areWarehousesEqual,
}
