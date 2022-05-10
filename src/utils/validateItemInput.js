const { UserInputError } = require('apollo-server')

const validateItemInput = ({ name, description, quantity }) => {
  if (!name || name.trim() === '') {
    throw new UserInputError('Name must not be empty')
  }
  if (!description || description.trim() === '') {
    throw new UserInputError('Description must not be empty')
  }
  if (quantity && isNaN(parseInt(quantity))) {
    throw new UserInputError('Quantity must be a number')
  }
}

module.exports = validateItemInput
