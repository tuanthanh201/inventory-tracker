const { UserInputError } = require('apollo-server')

const validateItemInput = ({ name, description, quantity }) => {
  if (!name || name.trim() === '') {
    throw new UserInputError('Name must not be empty')
  }
  if (!description || description.trim() === '') {
    throw new UserInputError('Description must not be empty')
  }
  if (quantity) {
    const parsedQuantity = parseInt(quantity)
    if (isNaN(parsedQuantity)) {
      throw new UserInputError('Quantity must be a number')
    } else if (parsedQuantity < 0) {
      throw new UserInputError('Quantity must be at least 0')
    }
  }
}

module.exports = validateItemInput
