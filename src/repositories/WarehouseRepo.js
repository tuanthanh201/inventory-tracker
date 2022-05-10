const Warehouse = require('../models/Warehouse')

const insert = async (warehouseData) => {
  try {
    const warehouse = new Warehouse(warehouseData)
    return await warehouse.save()
  } catch (error) {
    throw new Error(error)
  }
}

const save = async (warehouse) => {
  try {
    return await warehouse.save()
  } catch (error) {
    throw new Error(error)
  }
}

const findById = async (id) => {
  try {
    return await Warehouse.findById(id)
  } catch (error) {
    throw new Error(error)
  }
}

const findOne = async (cond) => {
  try {
    return await Warehouse.findOne(cond)
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
    return await Warehouse.find(findOptions)
      .sort(sortOptions)
      .limit(limitOptions)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteById = async (id) => {
  try {
    return await Warehouse.findByIdAndDelete(id)
  } catch (error) {
    throw new Error(Error)
  }
}

module.exports = {
  insert,
  save,
  findById,
  findOne,
  findMany,
  deleteById,
}
