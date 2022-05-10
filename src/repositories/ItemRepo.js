const Item = require('../models/Item')

const insert = async (itemData) => {
  try {
    const item = new Item(itemData)
    return await item.save()
  } catch (error) {
    throw new Error(error)
  }
}

const save = async (item) => {
  try {
    return await item.save()
  } catch (error) {
    throw new Error(error)
  }
}

const findById = async (id) => {
  try {
    return await Item.findById(id)
  } catch (error) {
    throw new Error(error)
  }
}

const findMany = async (
  findOptions = {},
  sortOptions = {},
  limitOptions = 0
) => {
  try {
    return await Item.find(findOptions).sort(sortOptions).limit(limitOptions)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteById = async (id) => {
  try {
    return await Item.findByIdAndDelete(id)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteMany = async (cond) => {
  try {
    return await Item.deleteMany(cond)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  insert,
  save,
  findById,
  findMany,
  deleteById,
  deleteMany,
}
