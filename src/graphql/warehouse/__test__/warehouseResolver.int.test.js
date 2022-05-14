const {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} = require('@apollo/client/core')
const fetch = require('cross-fetch')
const ObjectId = require('mongodb').ObjectId

const {
  FIND_WAREHOUSE_BY_ID,
  FIND_WAREHOUSE_BY_NAME,
  GET_ALL_WAREHOUSES,
  CREATE_WAREHOUSE,
  EDIT_WAREHOUSE,
} = require('./graphql')

const Warehouse = require('../../../models/Warehouse')
const connectToDB = require('../../../db/mongoose')
const { areWarehouseArraysEqual, areWarehousesEqual } = require('./utils')

const httpLink = createHttpLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/graphql`,
  fetch,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {},
    },
  }),
})

let mongo
beforeAll(async () => {
  mongo = await connectToDB()
})

afterAll(async () => {
  await mongo.connection.close()
})

let warehouses
beforeEach(async () => {
  await Warehouse.deleteMany()

  warehouses = []
  for (let i = 0; i < 5; i++) {
    const warehouse = new Warehouse({
      name: `Warehouse ${i + 1}`,
      location: `Location ${i + 1}`,
      description: `Description ${i + 1}`,
    })
    await warehouse.save()
    warehouses.unshift(warehouse)
  }
})

describe('Finds all warehouses', () => {
  it('Finds all warehouses successfully', async () => {
    const {
      data: { findAllWarehouses: foundWarehouses },
    } = await client.query({ query: GET_ALL_WAREHOUSES })
    expect(areWarehouseArraysEqual(warehouses, foundWarehouses)).toBe(true)
  })
})

describe('Finds warehouse by id', () => {
  it('Returns warehouse if one is found', async () => {
    const {
      data: { warehouse },
    } = await client.query({
      query: FIND_WAREHOUSE_BY_ID,
      variables: {
        warehouseId: warehouses[0].id,
      },
    })
    expect(areWarehousesEqual(warehouse, warehouses[0])).toBe(true)
  })

  it('Returns null if no warehouse was found', async () => {
    const {
      data: { warehouse },
    } = await client.query({
      query: FIND_WAREHOUSE_BY_ID,
      variables: {
        warehouseId: ObjectId().toString(),
      },
    })
    expect(warehouse).toBe(null)
  })
})

describe('Finds warehouses by name', () => {
  it('Finds all warehouse with names containing keyword name', async () => {
    const {
      data: { foundWarehouses },
    } = await client.query({
      query: FIND_WAREHOUSE_BY_NAME,
      variables: { name: '1' },
    })
    expect(
      areWarehouseArraysEqual(
        foundWarehouses,
        warehouses.filter((warehouse) => warehouse.name.includes('1'))
      )
    ).toBe(true)
  })
})

describe('Creates a new warehouse', () => {
  it('Creates and returns a new warehouse', async () => {
    const warehouseInput = {
      name: 'new warehouse',
      location: 'new location',
      description: 'description',
      image: '',
    }
    const {
      data: { warehouse },
    } = await client.mutate({
      mutation: CREATE_WAREHOUSE,
      variables: { warehouseInput },
    })
    expect(warehouse.name).toBe(warehouseInput.name)
    expect(warehouse.description).toBe(warehouseInput.description)
    expect(warehouse.location).toBe(warehouseInput.location)
    expect(warehouse.image).toBe(null)
  })
})

describe('Edits warehouse', () => {
  it('Edits and returns the updated warehouse', async () => {
    const warehouseInput = {
      name: 'new warehouse',
      location: 'new location',
      description: 'description',
      image: '',
    }
    const {
      data: { warehouse },
    } = await client.mutate({
      mutation: EDIT_WAREHOUSE,
      variables: {
        warehouseId: warehouses[0].id,
        warehouseInput,
      },
    })
    expect(warehouse.name).toBe(warehouseInput.name)
    expect(warehouse.description).toBe(warehouseInput.description)
    expect(warehouse.location).toBe(warehouseInput.location)
    expect(warehouse.image).toBe(null)
  })
})
