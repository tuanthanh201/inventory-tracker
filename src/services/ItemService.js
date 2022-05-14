const { DataSource } = require('apollo-datasource')
const ObjectId = require('mongodb').ObjectId

const validateItemInput = require('../utils/validateItemInput')
const { uploadBase64Image, deleteImages, getCloudFrontUrl } = require('../S3')

class ItemService extends DataSource {
  constructor({ store }) {
    super()
    this.store = store
    this.limit = 11
  }

  initialize(config) {
    this.context = config.context
  }

  getItemQuery(items) {
    const itemsLength = items.length
    const itemIds = items.map((item) => item._id.toString())
    let last = itemIds[itemIds.length - 1]
    let hasMore = false
    if (itemsLength === this.limit) {
      items.pop()
      hasMore = true
      last = itemIds[itemIds.length - 2]
    }
    return { items, hasMore, last }
  }

  getImageUrl = (imageKey) => {
    if (imageKey !== '') {
      return getCloudFrontUrl(imageKey)
    }
    return null
  }

  async findItemById(itemId) {
    try {
      return await this.store.itemRepo.findById(itemId)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findItemsByIds(itemIds) {
    try {
      return await this.store.itemRepo.findMany(
        { _id: { $in: itemIds } },
        { _id: -1 }
      )
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAllItems(cursor) {
    try {
      const findOptions = cursor ? { _id: { $lt: cursor } } : {}
      const items = await this.store.itemRepo.findMany(
        findOptions,
        { _id: -1 },
        this.limit
      )
      return this.getItemQuery(items)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findItemsByName(name, cursor) {
    try {
      const searchOption = { $regex: `${name}`, $options: 'i' }
      const findOptions = cursor
        ? { $and: [{ _id: { $lt: cursor } }, { name: searchOption }] }
        : { name: searchOption }
      const items = await this.store.itemRepo.findMany(
        findOptions,
        { _id: -1 },
        this.limit
      )
      return this.getItemQuery(items)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findItemsByTag(tag, cursor) {
    try {
      const searchOption = { $regex: `${tag}`, $options: 'i' }
      const findOption = cursor
        ? {
            $and: [{ _id: { $lt: cursor } }, { 'tags.content': searchOption }],
          }
        : { 'tags.content': searchOption }
      const items = await this.store.itemRepo.findMany(
        findOption,
        { _id: -1 },
        this.limit
      )
      return this.getItemQuery(items)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findItemsByWarehouse(warehouseId, cursor) {
    try {
      const findOption = cursor
        ? {
            $and: [
              { _id: { $lt: cursor } },
              { warehouse: ObjectId(warehouseId) },
            ],
          }
        : { warehouse: ObjectId(warehouseId) }
      const items = await this.store.itemRepo.findMany(
        findOption,
        { _id: -1 },
        this.limit
      )
      return this.getItemQuery(items)
    } catch (error) {
      throw new Error(error)
    }
  }

  async createItem({ itemInput }) {
    let { warehouse, name, description, image, tags, quantity } = itemInput
    validateItemInput(itemInput)

    let newItem = {
      name,
      description,
      quantity: quantity ? parseInt(quantity) : 0,
    }

    // check if item is assigned to a warehouse
    if (warehouse.trim() !== '') {
      warehouse = await this.store.warehouseRepo.findOne({ name: warehouse })
      if (!warehouse) {
        throw new Error('Warehouse does note exist')
      }
      newItem.warehouse = warehouse._id
    }

    // check if item has an image
    if (image.trim() !== '') {
      const { Key } = await uploadBase64Image(image)
      newItem.image = Key
    }

    // check if item has any tags
    if (tags.trim() !== '') {
      tags = tags.split(' ')
      newItem.tags = []
      for (let content of tags) {
        content = content.trim()
        if (content !== '') {
          let tag = await this.store.tagRepo.findOne({ content })
          if (!tag) {
            // if tag doesnt exist then create tag and add it to item
            tag = await this.store.tagRepo.insert(content)
          }
          newItem.tags.push({ tagId: tag._id, content })
        }
      }
    }
    return this.store.itemRepo.insert(newItem)
  }

  async editItem(args) {
    try {
      const { itemId, itemInput } = args
      validateItemInput(itemInput)
      let { name, description, warehouse, tags, image, quantity } = itemInput
      const item = await this.store.itemRepo.findById(itemId)

      if (!item) {
        throw new Error('Item does not exist')
      }

      item.name = name
      item.description = description
      item.quantity = quantity ? parseInt(quantity) : item.quantity
      // check if itemInput has warehouse
      if (warehouse.trim() !== '') {
        warehouse = await this.store.warehouseRepo.findOne({ name: warehouse })
        if (!warehouse) {
          throw new Error('Warehouse does not exist')
        }
        item.warehouse = warehouse._id
      } else {
        item.warehouse = null
      }

      // check if itemInput has an image
      if (image.trim() !== '') {
        if (item.image !== '') {
          await deleteImages([item.image])
        }
        const { Key } = await uploadBase64Image(itemInput.image)
        item.image = Key
      }

      // check if itemInput has any tags
      item.tags = []
      if (tags.trim() !== '') {
        tags = tags.split(' ')
        for (const content of tags) {
          if (content.trim() !== '') {
            let tag = await this.store.tagRepo.findOne({ content })
            if (!tag) {
              tag = await this.store.tagRepo.insert(content)
            }
            item.tags.push({ tagId: tag._id, content })
          }
        }
      }
      return await this.store.itemRepo.save(item)
    } catch (error) {
      throw new Error(error)
    }
  }

  async assignWarehouse({ itemIds, warehouseName }) {
    try {
      const warehouse = await this.store.warehouseRepo.findOne({
        name: warehouseName,
      })
      if (!warehouse) {
        throw new Error('Warehouse does not exist')
      }

      for (const itemId of itemIds) {
        const item = await this.store.itemRepo.findById(itemId)
        if (!item) {
          throw new Error('Item does not exist')
        }
        item.warehouse = warehouse._id
        await this.store.itemRepo.save(item)
      }
      return 'Assigned succesfully'
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteItems({ itemIds }) {
    try {
      await this.store.itemRepo.deleteMany({ _id: { $in: itemIds } })
      return 'Deleted successfully'
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = ItemService
