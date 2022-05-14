jest.mock('../../S3', () => ({
  uploadBase64Image: () => ({ Key: 'someKey' }),
  getCloudFrontUrl: () => 'someUrl',
}))

const WarehouseService = require('../WarehouseService')

const getMockStore = () => ({
  warehouseRepo: {
    insert: jest.fn(),
    save: jest.fn(),
    findById: jest.fn(),
    findOne: jest.fn(),
    findMany: jest.fn(),
  },
})

let warehouseService = null
let mockStore = null
beforeEach(() => {
  jest.resetModules()
  mockStore = getMockStore()
  warehouseService = new WarehouseService({ store: mockStore })
})

describe('WarehouseService.findWarehouseById', () => {
  it('Finds warehouse by id', async () => {
    // given
    const expectedWarehouse = { _id: 1 }
    mockStore.warehouseRepo.findById.mockReturnValueOnce(expectedWarehouse)

    // when
    const warehouse = await warehouseService.findWarehouseById(
      expectedWarehouse._id
    )

    // then
    expect(warehouse).toStrictEqual(expectedWarehouse)
    expect(mockStore.warehouseRepo.findById).toHaveBeenLastCalledWith(
      expectedWarehouse._id
    )
  })
})

describe('WarehouseService.findWarehousesByIds', () => {
  it('Finds warehouses by ids', async () => {
    // given
    const ids = [1, 2, 3]
    const expectedWarehouses = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    mockStore.warehouseRepo.findMany.mockReturnValueOnce(expectedWarehouses)

    // when
    const warehouses = await warehouseService.findWarehousesByIds(ids)

    // then
    expect(warehouses).toStrictEqual(expectedWarehouses)
    expect(mockStore.warehouseRepo.findMany).toHaveBeenLastCalledWith({
      _id: { $in: ids },
    })
  })
})

describe('WarehouseService.findWarehousesByName', () => {
  it('Finds all warehouses that contain name', async () => {
    // given
    const name = 'wa'
    const expectedWarehouses = [
      { _id: 1, name: 'Warehouse 1' },
      { _id: 2, name: 'warehouse' },
    ]
    mockStore.warehouseRepo.findMany.mockReturnValueOnce(expectedWarehouses)

    // when
    const warehouses = await warehouseService.findWarehousesByName(name)

    // then
    expect(warehouses).toStrictEqual(expectedWarehouses)
    expect(mockStore.warehouseRepo.findMany).toHaveBeenLastCalledWith(
      { name: { $regex: `${name}`, $options: 'i' } },
      { _id: -1 }
    )
  })
})

describe('WarehouseService.findAllWarehouses', () => {
  it('Finds all warehouses', async () => {
    // given
    const expectedWarehouses = [{ _id: 1 }, { _id: 2 }, { _id: 3 }]
    mockStore.warehouseRepo.findMany.mockReturnValueOnce(expectedWarehouses)

    // when
    const warehouses = await warehouseService.findAllWarehouses()

    // then
    expect(warehouses).toStrictEqual(expectedWarehouses)
    expect(mockStore.warehouseRepo.findMany).toHaveBeenLastCalledWith(
      {},
      { _id: -1 }
    )
  })
})

describe('WarehouseService.createWarehouse', () => {
  it('Fails if name is empty', async () => {
    // given
    const args = {
      warehouseInput: { name: '' },
    }

    // then
    await expect(
      async () => await warehouseService.createWarehouse(args)
    ).rejects.toThrow('Name must not be empty')
  })

  it('Fails if location is empty', async () => {
    // given
    const args = {
      warehouseInput: { name: 'Warehouse', location: '' },
    }

    // then
    await expect(
      async () => await warehouseService.createWarehouse(args)
    ).rejects.toThrow('Location must not be empty')
  })

  it('Fails if description is empty', async () => {
    // given
    const args = {
      warehouseInput: {
        name: 'Warehouse',
        location: 'A1B 2C3',
        description: '',
      },
    }

    // then
    await expect(
      async () => await warehouseService.createWarehouse(args)
    ).rejects.toThrow('Description must not be empty')
  })

  it('Fails if a warehouse with the same name already exists', async () => {
    // given
    const args = {
      warehouseInput: {
        name: 'Warehouse',
        location: 'A1B 2C3',
        description: 'A new warehouse',
      },
    }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce({ _id: 1 })

    // then
    await expect(
      async () => await warehouseService.createWarehouse(args)
    ).rejects.toThrow('A warehouse with that name already exists')
    expect(mockStore.warehouseRepo.findOne).toHaveBeenLastCalledWith({
      name: args.warehouseInput.name,
    })
  })

  it('Creates and returns the new warehouse', async () => {
    // given
    const args = {
      warehouseInput: {
        name: 'Warehouse',
        location: 'A1B 2C3',
        description: 'A new warehouse',
        image: '',
      },
    }
    const expectedWarehouse = {
      name: args.warehouseInput.name,
      location: args.warehouseInput.location,
      description: args.warehouseInput.description,
    }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(undefined)
    mockStore.warehouseRepo.insert.mockReturnValueOnce(expectedWarehouse)

    // when
    const warehouse = await warehouseService.createWarehouse(args)

    // then
    expect(warehouse).toEqual(expectedWarehouse)
    expect(mockStore.warehouseRepo.insert).toHaveBeenLastCalledWith({
      ...expectedWarehouse,
    })
  })

  it('Uploads image to S3', async () => {
    // given
    const args = {
      warehouseInput: {
        name: 'Warehouse',
        location: 'A1B 2C3',
        description: 'A new warehouse',
        image: 'base64Image',
      },
    }
    const expectedWarehouse = {
      name: args.warehouseInput.name,
      location: args.warehouseInput.location,
      description: args.warehouseInput.description,
      image: 'someKey',
    }
    mockStore.warehouseRepo.findOne.mockReturnValueOnce(undefined)
    mockStore.warehouseRepo.insert.mockReturnValueOnce(expectedWarehouse)

    // when
    const warehouse = await warehouseService.createWarehouse(args)

    // then
    expect(warehouse).toEqual(expectedWarehouse)
    expect(mockStore.warehouseRepo.insert).toHaveBeenLastCalledWith({
      ...expectedWarehouse,
    })
  })
})
