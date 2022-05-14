const ObjectId = require('mongodb').ObjectId

jest.mock('../../S3', () => ({
  uploadBase64Image: () => ({ Key: 'someKey' }),
  getCloudFrontUrl: () => 'someUrl',
}))

const ItemService = require('../ItemService')

const getMockStore = () => ({
  warehouseRepo: {
    findOne: jest.fn(),
  },
  tagRepo: {
    findOne: jest.fn(),
    insert: jest.fn(),
  },
  itemRepo: {
    insert: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
})

let itemService = null
let mockStore = null
const limit = 11
beforeEach(() => {
  jest.resetModules()
  mockStore = getMockStore()
  itemService = new ItemService({ store: mockStore })
})

describe('ItemService.findItemById', () => {
  it('Finds item by id', async () => {
    // given
    const expectedItem = { _id: 1 }
    mockStore.itemRepo.findById.mockReturnValueOnce(expectedItem)

    // when
    const item = await itemService.findItemById(expectedItem._id)

    // then
    expect(item).toStrictEqual(expectedItem)
    expect(mockStore.itemRepo.findById).toHaveBeenLastCalledWith(
      expectedItem._id
    )
  })
})

describe('ItemService.findItemsByIds', () => {
  it('Finds items by ids', async () => {
    // given
    const ids = [1, 2, 3]
    const expectedItems = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    mockStore.itemRepo.findMany.mockReturnValueOnce(expectedItems)

    // when
    const items = await itemService.findItemsByIds(ids)

    // then
    expect(items).toStrictEqual(expectedItems)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      { _id: { $in: ids } },
      { _id: -1 }
    )
  })
})

const createItems = (count) => {
  const items = []
  for (let i = 1; i <= count; i++) {
    items.push({ _id: i })
  }
  return items
}

describe('ItemService.findAllItems', () => {
  it('Finds the first 10 items if cursor is not provided', async () => {
    // given
    const expectedItems = createItems(limit)
    const expectedItemQuery = {
      items: expectedItems.slice(0, 10),
      last: '10',
      hasMore: true,
    }
    mockStore.itemRepo.findMany.mockReturnValueOnce(expectedItems)

    // when
    const itemQuery = await itemService.findAllItems()

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      {},
      { _id: -1 },
      limit
    )
  })

  it('Returns 10 items after cursor if cursor is provided', async () => {
    // given
    const expectedItems = createItems(limit)
    const expectedItemQuery = {
      items: expectedItems.slice(2, 11),
      last: '11',
      hasMore: false,
    }
    const cursor = '2'
    mockStore.itemRepo.findMany.mockReturnValueOnce(expectedItems.slice(2, 11))

    // when
    const itemQuery = await itemService.findAllItems(cursor)

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      { _id: { $lt: cursor } },
      { _id: -1 },
      limit
    )
  })
})

describe('ItemService.findItemsByName', () => {
  it('Finds the first 10 items if cursor is not provided', async () => {
    // given
    const items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    const expectedItemQuery = {
      items: items,
      last: '3',
      hasMore: false,
    }
    const name = 'warehouse'
    mockStore.itemRepo.findMany.mockReturnValueOnce(items)

    // when
    const itemQuery = await itemService.findItemsByName(name)

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      { name: { $regex: `${name}`, $options: 'i' } },
      { _id: -1 },
      limit
    )
  })

  it('Returns 10 items after cursor if cursor is provided', async () => {
    // given
    const items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    const expectedItemQuery = {
      items: items.slice(1),
      last: '3',
      hasMore: false,
    }
    const name = 'warehouse'
    const cursor = '1'
    mockStore.itemRepo.findMany.mockReturnValueOnce(items.slice(1))

    // when
    const itemQuery = await itemService.findItemsByName(name, cursor)

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      {
        $and: [
          { _id: { $lt: cursor } },
          { name: { $regex: `${name}`, $options: 'i' } },
        ],
      },
      { _id: -1 },
      limit
    )
  })
})

describe('ItemService.findItemsByTag', () => {
  it('Finds the first 10 items if cursor is not provided', async () => {
    // given
    const items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    const expectedItemQuery = {
      items: items,
      last: '3',
      hasMore: false,
    }
    const tag = 'warehouse'
    mockStore.itemRepo.findMany.mockReturnValueOnce(items)

    // when
    const itemQuery = await itemService.findItemsByTag(tag)

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      { 'tags.content': { $regex: `${tag}`, $options: 'i' } },
      { _id: -1 },
      limit
    )
  })

  it('Returns 10 items after cursor if cursor is provided', async () => {
    // given
    const items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    const expectedItemQuery = {
      items: items.slice(1),
      last: '3',
      hasMore: false,
    }
    const tag = 'warehouse'
    const cursor = '1'
    mockStore.itemRepo.findMany.mockReturnValueOnce(items.slice(1))

    // when
    const itemQuery = await itemService.findItemsByTag(tag, cursor)

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      {
        $and: [
          { _id: { $lt: cursor } },
          { 'tags.content': { $regex: `${tag}`, $options: 'i' } },
        ],
      },
      { _id: -1 },
      limit
    )
  })
})

describe('ItemService.findItemsByWarehouse', () => {
  it('Finds the first 10 items if cursor is not provided', async () => {
    // given
    const items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    const expectedItemQuery = {
      items: items,
      last: '3',
      hasMore: false,
    }
    const warehouseId = '000000012aff3f6d2d8c1ce6'
    mockStore.itemRepo.findMany.mockReturnValueOnce(items)

    // when
    const itemQuery = await itemService.findItemsByWarehouse(warehouseId)

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      { warehouse: ObjectId(warehouseId) },
      { _id: -1 },
      limit
    )
  })

  it('Returns 10 items after cursor if cursor is provided', async () => {
    // given
    const items = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    const expectedItemQuery = {
      items: items.slice(1),
      last: '3',
      hasMore: false,
    }
    const warehouseId = '000000012aff3f6d2d8c1ce6'
    const cursor = '1'
    mockStore.itemRepo.findMany.mockReturnValueOnce(items.slice(1))

    // when
    const itemQuery = await itemService.findItemsByWarehouse(
      warehouseId,
      cursor
    )

    // then
    expect(itemQuery).toEqual(expectedItemQuery)
    expect(mockStore.itemRepo.findMany).toHaveBeenLastCalledWith(
      {
        $and: [{ _id: { $lt: cursor } }, { warehouse: ObjectId(warehouseId) }],
      },
      { _id: -1 },
      limit
    )
  })
})

describe('WarehouseService.createItem', () => {
  it('Fails if name is empty', async () => {
    // given
    const args = {
      itemInput: { name: '' },
    }

    // then
    await expect(
      async () => await itemService.createItem(args)
    ).rejects.toThrow('Name must not be empty')
  })

  it('Fails if description is empty', async () => {
    // given
    const args = {
      itemInput: { name: 'Item', description: '' },
    }

    // then
    await expect(
      async () => await itemService.createItem(args)
    ).rejects.toThrow('Description must not be empty')
  })

  it('Fails if quantity is not a number', async () => {
    // given
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 'string',
      },
    }

    // then
    await expect(
      async () => await itemService.createItem(args)
    ).rejects.toThrow('Quantity must be a number')
  })

  it('Fails if quantity is smaller than 0', async () => {
    // given
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: -1,
      },
    }

    // then
    await expect(
      async () => await itemService.createItem(args)
    ).rejects.toThrow('Quantity must be at least 0')
  })

  it('Creates and returns the new item', async () => {
    // given
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: '',
        tags: '',
      },
    }
    const expectedItem = {
      name: args.itemInput.name,
      description: args.itemInput.description,
      quantity: args.itemInput.quantity,
    }
    mockStore.itemRepo.insert.mockReturnValueOnce(expectedItem)

    // when
    const item = await itemService.createItem(args)

    // then
    expect(mockStore.itemRepo.insert).toHaveBeenLastCalledWith({
      ...expectedItem,
    })
    expect(item).toStrictEqual(expectedItem)
  })

  it('Creates a new item and assign it to the given warehouse', async () => {
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: 'Warehouse',
        image: '',
        tags: '',
      },
    }
    const expectedItem = {
      name: args.itemInput.name,
      description: args.itemInput.description,
      quantity: args.itemInput.quantity,
      warehouse: 1,
    }
    const warehouse = {
      name: args.itemInput.warehouse,
      _id: expectedItem.warehouse,
    }
    mockStore.itemRepo.insert.mockReturnValueOnce(expectedItem)
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(warehouse)

    // when
    const item = await itemService.createItem(args)

    // then
    expect(mockStore.warehouseRepo.findOne).toHaveBeenLastCalledWith({
      name: args.itemInput.warehouse,
    })
    expect(mockStore.itemRepo.insert).toHaveBeenLastCalledWith({
      ...expectedItem,
    })
    expect(item).toStrictEqual(expectedItem)
  })

  it('Fails if the provided warehouse does not exist', async () => {
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: 'Warehouse',
        image: '',
        tags: '',
      },
    }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(undefined)

    // then
    await expect(
      async () => await itemService.createItem(args)
    ).rejects.toThrow('Warehouse does not exist')
    expect(mockStore.warehouseRepo.findOne).toHaveBeenLastCalledWith({
      name: args.itemInput.warehouse,
    })
  })

  it('Uploads image to S3', async () => {
    // given
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: 'base64Image',
        tags: '',
      },
    }
    const expectedItem = {
      name: args.itemInput.name,
      description: args.itemInput.description,
      quantity: args.itemInput.quantity,
      image: 'someKey',
    }
    mockStore.itemRepo.insert.mockReturnValueOnce(expectedItem)

    // when
    const item = await itemService.createItem(args)

    // then
    expect(mockStore.itemRepo.insert).toHaveBeenLastCalledWith({
      ...expectedItem,
    })
    expect(item).toStrictEqual(expectedItem)
  })

  it('Creates tag if it does not already exist', async () => {
    // given
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: '',
        tags: 'item',
      },
    }
    const tag = { _id: 1, content: 'item' }
    const expectedItem = {
      name: args.itemInput.name,
      description: args.itemInput.description,
      quantity: args.itemInput.quantity,
      tags: [{ tagId: tag._id, content: tag.content }],
    }
    mockStore.itemRepo.insert.mockReturnValueOnce(expectedItem)
    mockStore.tagRepo.findOne.mockReturnValueOnce(undefined)
    mockStore.tagRepo.insert.mockReturnValueOnce(tag)

    // when
    const item = await itemService.createItem(args)

    // then
    expect(mockStore.tagRepo.findOne).toHaveBeenLastCalledWith({
      content: tag.content,
    })
    expect(mockStore.tagRepo.insert).toHaveBeenLastCalledWith(tag.content)
    expect(mockStore.itemRepo.insert).toHaveBeenLastCalledWith({
      ...expectedItem,
    })
    expect(item).toStrictEqual(expectedItem)
  })

  it('Assigns tag to item if tag already exists', async () => {
    // given
    const args = {
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: '',
        tags: 'item',
      },
    }
    const tag = { _id: 1, content: 'item' }
    const expectedItem = {
      name: args.itemInput.name,
      description: args.itemInput.description,
      quantity: args.itemInput.quantity,
      tags: [{ tagId: tag._id, content: tag.content }],
    }
    mockStore.itemRepo.insert.mockReturnValueOnce(expectedItem)
    mockStore.tagRepo.findOne.mockReturnValueOnce(tag)

    // when
    const item = await itemService.createItem(args)

    // then
    expect(mockStore.tagRepo.findOne).toHaveBeenLastCalledWith({
      content: tag.content,
    })
    expect(mockStore.itemRepo.insert).toHaveBeenLastCalledWith({
      ...expectedItem,
    })
    expect(item).toStrictEqual(expectedItem)
  })
})

describe('ItemService.editItem', () => {
  it('Fails if name is empty', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: { name: '' },
    }

    // then
    await expect(async () => await itemService.editItem(args)).rejects.toThrow(
      'Name must not be empty'
    )
  })

  it('Fails if description is empty', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: { name: 'Item', description: '' },
    }

    // then
    await expect(async () => await itemService.editItem(args)).rejects.toThrow(
      'Description must not be empty'
    )
  })

  it('Fails if quantity is not a number', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 'string',
      },
    }

    // then
    await expect(async () => await itemService.editItem(args)).rejects.toThrow(
      'Quantity must be a number'
    )
  })

  it('Fails if quantity is smaller than 0', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: -1,
      },
    }

    // then
    await expect(async () => await itemService.editItem(args)).rejects.toThrow(
      'Quantity must be at least 0'
    )
  })

  it('Fails if item does not exist', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
      },
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(undefined)

    // then
    await expect(async () => await itemService.editItem(args)).rejects.toThrow(
      'Item does not exist'
    )
  })

  it('Edits item', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: '',
        tags: '',
      },
    }
    const expectedItem = {
      name: 'Item',
      description: 'Description',
      quantity: 10,
      warehouse: null,
      image: '',
      tags: [],
    }
    const oldItem = {
      name: 'Old name',
      description: 'Old description',
      quantity: 20,
      warehouse: null,
      image: '',
      tags: [],
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(oldItem)
    mockStore.itemRepo.save.mockReturnValueOnce(expectedItem)

    // when
    const item = await itemService.editItem(args)

    // then
    expect(item).toStrictEqual(expectedItem)
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith(expectedItem)
  })

  it('Assigns item to the provided warehouse', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: 'Warehouse',
        image: '',
        tags: '',
      },
    }
    const expectedItem = {
      name: 'Item',
      description: 'Description',
      quantity: 10,
      warehouse: 1,
      image: '',
      tags: [],
    }
    const oldItem = {
      name: 'Old name',
      description: 'Old description',
      quantity: 20,
      warehouse: '',
      image: '',
      tags: [],
    }
    const warehouse = {
      name: args.itemInput.warehouse,
      _id: expectedItem.warehouse,
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(oldItem)
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(warehouse)
    mockStore.itemRepo.save.mockReturnValueOnce(expectedItem)

    // when
    const item = await itemService.editItem(args)

    // then
    expect(item).toStrictEqual(expectedItem)
    expect(mockStore.warehouseRepo.findOne).toHaveBeenLastCalledWith({
      name: args.itemInput.warehouse,
    })
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith(expectedItem)
  })

  it('Fails if the provided warehouse does not exist', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: 'Warehouse',
        image: '',
        tags: '',
      },
    }
    const oldItem = {
      name: 'Old name',
      description: 'Old description',
      quantity: 20,
      warehouse: '',
      image: '',
      tags: [],
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(oldItem)
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(undefined)

    // then
    await expect(async () => await itemService.editItem(args)).rejects.toThrow(
      'Warehouse does not exist'
    )
    expect(mockStore.warehouseRepo.findOne).toHaveBeenLastCalledWith({
      name: args.itemInput.warehouse,
    })
  })

  it('Uploads image to S3', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: 'base64Image',
        tags: '',
      },
    }
    const expectedItem = {
      name: 'Item',
      description: 'Description',
      quantity: 10,
      warehouse: null,
      image: 'someKey',
      tags: [],
    }
    const oldItem = {
      name: 'Old name',
      description: 'Old description',
      quantity: 20,
      warehouse: null,
      image: '',
      tags: [],
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(oldItem)
    mockStore.itemRepo.save.mockReturnValueOnce(expectedItem)

    // when
    const item = await itemService.editItem(args)

    // then
    expect(item).toStrictEqual(expectedItem)
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith(expectedItem)
  })

  it('Assings tag to item if tag already exists', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: '',
        tags: 'item',
      },
    }
    const tag = { _id: 1, content: 'item' }
    const expectedItem = {
      name: 'Item',
      description: 'Description',
      quantity: 10,
      warehouse: null,
      image: '',
      tags: [{ tagId: tag._id, content: tag.content }],
    }
    const oldItem = {
      name: 'Old name',
      description: 'Old description',
      quantity: 20,
      warehouse: null,
      image: '',
      tags: [],
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(oldItem)
    mockStore.itemRepo.save.mockReturnValueOnce(expectedItem)
    mockStore.tagRepo.findOne.mockReturnValueOnce(tag)

    // when
    const item = await itemService.editItem(args)

    // then
    expect(item).toStrictEqual(expectedItem)
    expect(mockStore.tagRepo.findOne).toHaveBeenLastCalledWith({
      content: tag.content,
    })
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith(expectedItem)
  })

  it('Creates tag if tag does not already exist', async () => {
    // given
    const args = {
      itemId: 1,
      itemInput: {
        name: 'Item',
        description: 'Description',
        quantity: 10,
        warehouse: '',
        image: '',
        tags: 'item',
      },
    }
    const tag = { _id: 1, content: 'item' }
    const expectedItem = {
      name: 'Item',
      description: 'Description',
      quantity: 10,
      warehouse: null,
      image: '',
      tags: [{ tagId: tag._id, content: tag.content }],
    }
    const oldItem = {
      name: 'Old name',
      description: 'Old description',
      quantity: 20,
      warehouse: null,
      image: '',
      tags: [],
    }
    mockStore.itemRepo.findById.mockReturnValueOnce(oldItem)
    mockStore.itemRepo.save.mockReturnValueOnce(expectedItem)
    mockStore.tagRepo.findOne.mockReturnValueOnce(undefined)
    mockStore.tagRepo.insert.mockReturnValueOnce(tag)

    // when
    const item = await itemService.editItem(args)

    // then
    expect(item).toStrictEqual(expectedItem)
    expect(mockStore.tagRepo.findOne).toHaveBeenLastCalledWith({
      content: tag.content,
    })
    expect(mockStore.tagRepo.insert).toHaveBeenLastCalledWith(tag.content)
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith(expectedItem)
  })
})

describe('ItemService.assignWarehouse', () => {
  it('Fails if warehouse does not exist', async () => {
    // given
    const args = {
      itemIds: [1, 2, 3],
      warehouseName: 'warehouse',
    }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(undefined)

    // then
    await expect(
      async () => await itemService.assignWarehouse(args)
    ).rejects.toThrow('Warehouse does not exist')
  })

  it('Fails if one the item does not exist', async () => {
    // given
    const args = {
      itemIds: [1, 2, 3],
      warehouseName: 'warehouse',
    }
    const firstItem = { _id: 1 }
    const warehouse = { _id: 1, name: 'warehouse' }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(warehouse)
    mockStore.itemRepo.findById
      .mockReturnValueOnce(firstItem)
      .mockReturnValueOnce(undefined)

    // then
    await expect(
      async () => await itemService.assignWarehouse(args)
    ).rejects.toThrow('Item does not exist')
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith({
      ...firstItem,
      warehouse: warehouse._id,
    })
    expect(mockStore.itemRepo.save).toHaveBeenCalledTimes(1)
  })

  it('Assigns all provided items to provided warehouse', async () => {
    // given
    const args = {
      itemIds: [1, 2, 3],
      warehouseName: 'warehouse',
    }
    const firstItem = { _id: 1 }
    const secondItem = { _id: 1 }
    const thirdItem = { _id: 1 }
    const warehouse = { _id: 1, name: 'warehouse' }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(warehouse)
    mockStore.itemRepo.findById
      .mockReturnValueOnce(firstItem)
      .mockReturnValueOnce(secondItem)
      .mockReturnValueOnce(thirdItem)

    // when
    await itemService.assignWarehouse(args)

    // then
    expect(mockStore.itemRepo.save).toHaveBeenLastCalledWith({
      ...thirdItem,
      warehouse: warehouse._id,
    })
    expect(mockStore.itemRepo.save).toHaveBeenCalledTimes(args.itemIds.length)
  })
})

describe('ItemService.deleteItems', () => {
  it('Deletes all provided items', async () => {
    // given
    const args = {
      itemIds: [1, 2, 3],
    }

    // when
    await itemService.deleteItems(args)

    // then
    expect(mockStore.itemRepo.deleteMany).toHaveBeenLastCalledWith({
      _id: { $in: args.itemIds },
    })
  })
})
