const validateQuantity = (quantity) => {
  const parsedQuantity = parseInt(quantity)
  return !isNaN(parsedQuantity) && parsedQuantity >= 0
}

export default validateQuantity
