const { UserInputError } = require('apollo-server')

const validateWarehouseInput = ({ name, location, description }) => {
  if (!name || name.trim() === '') {
    throw new UserInputError('Name must not be empty')
  }
  if (!location || location.trim() === '') {
    throw new UserInputError('Location must not be empty')
  }
  if (!description || description.trim() === '') {
    throw new UserInputError('Description must not be empty')
  }
}

module.exports = validateWarehouseInput
