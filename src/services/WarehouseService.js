const { DataSource } = require('apollo-datasource')
const { uploadBase64Image, deleteImages } = require('../S3')
const validateWarehouseInput = require('../utils/validateWarehouseInput')

class WarehouseService extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async findWarehouseById(id) {
    try {
      return this.store.warehouseRepo.findById(id)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAllWarehouses() {
    try {
      return this.store.warehouseRepo.findMany()
    } catch (error) {
      throw new Error(error)
    }
  }

  async createWarehouse({ warehouseInput }) {
    try {
      validateWarehouseInput(warehouseInput)
      const { name, location, description, image } = warehouseInput
      let newWarehouse = {
        name,
        location,
        description,
      }

      // check if warehouseInput contains an image
      if (image.trim() !== '') {
        const { Key } = await uploadBase64Image(image)
        newWarehouse.image = Key
      }
      return this.store.warehouseRepo.insert(newWarehouse)
    } catch (error) {
      throw new Error(error)
    }
  }

  async editWarehouse(args) {
    try {
      const { warehouseId, warehouseInput } = args
      validateWarehouseInput(warehouseInput)
      const warehouse = await this.store.warehouseRepo.findById(warehouseId)

      if (!warehouse) {
        throw new Error('Warehouse does not exist')
      }

      const { name, location, description, image } = warehouseInput
      warehouse.name = name
      warehouse.location = location
      warehouse.description = description

      if (image.trim() !== '') {
        if (warehouse.image !== '') {
          await deleteImages([warehouse.image])
        }
        const { Key } = await uploadBase64Image(image)
        warehouse.image = Key
      }
      return await this.store.warehouseRepo.save(warehouse)
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = WarehouseService
