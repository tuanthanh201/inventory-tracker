const {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} = require('@apollo/client/core')
const fetch = require('cross-fetch')

const {
  GET_ALL_ITEMS,
  FIND_ITEMS_BY_NAME,
  FIND_ITEM_BY_ID,
  FIND_ITEMS_BY_TAG,
  FIND_ITEMS_BY_WAREHOUSE,
  CREATE_ITEM,
  EDIT_ITEM,
  ASSIGN_WAREHOUSE,
  DELETE_ITEMS,
} = require('./graphql')

const Item = require('../../../models/Item')
const Warehouse = require('../../../models/Warehouse')
const Tag = require('../../../models/Tag')
const connectToDB = require('../../../db/mongoose')
const { areItemArraysEqual, areItemsEqual } = require('./utils')

const httpLink = createHttpLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/graphql`,
  fetch,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {},
      Mutation: {},
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

let items
let tag
let warehouse
beforeEach(async () => {
  await Item.deleteMany()
  await Tag.deleteMany()

  tag = new Tag({ content: 'tag' })
  await tag.save()
  warehouse = new Warehouse({
    name: `Warehouse`,
    location: `Location`,
    description: `Description`,
  })
  await warehouse.save()
  items = []
  for (let i = 0; i < 5; i++) {
    const item = new Item({
      name: `Item ${i + 1}`,
      description: `Description ${i + 1}`,
      quantity: i,
      tags: i === 2 ? [{ tagId: tag.id, content: tag.content }] : [],
      warehouse: i === 2 ? warehouse.id : null,
    })
    await item.save()
    items.unshift(item)
  }
})

describe('Find all items', () => {
  it('Finds all items', async () => {
    const {
      data: {
        findAllItems: { items: foundItems },
      },
    } = await client.query({ query: GET_ALL_ITEMS })
    expect(areItemArraysEqual(foundItems, items)).toBe(true)
  })
})

describe('Finds items by name', () => {
  it('Finds items with name containing the keyword name', async () => {
    const {
      data: {
        findItemsByName: { items: foundItems },
      },
    } = await client.query({
      query: FIND_ITEMS_BY_NAME,
      variables: { name: '5' },
    })
    expect(areItemsEqual(foundItems[0], items[0])).toBe(true)
  })
})

describe('Finds item by id', () => {
  it('Finds item by id', async () => {
    const {
      data: { item },
    } = await client.query({
      query: FIND_ITEM_BY_ID,
      variables: { itemId: items[0].id },
    })
    expect(areItemsEqual(item, items[0])).toBe(true)
  })
})

describe('Finds items by tag', () => {
  it('Finds items that contain a tag', async () => {
    const {
      data: {
        findItemsByTag: { items },
      },
    } = await client.query({
      query: FIND_ITEMS_BY_TAG,
      variables: { tag: 'tag' },
    })
    expect(items.length).toBe(1)
    expect(items[0].name).toBe('Item 3')
    expect(items[0].description).toBe('Description 3')
    expect(items[0].quantity).toBe(2)
    expect(items[0].tags).not.toBe([])
  })
})

describe('Finds items by warehouse', () => {
  it('Finds items that were assigned to warehouse', async () => {
    const {
      data: {
        findItemsByWarehouse: { items: foundItems },
      },
    } = await client.query({
      query: FIND_ITEMS_BY_WAREHOUSE,
      variables: { warehouseId: warehouse.id },
    })
    expect(foundItems.length).toBe(1)
    expect(foundItems[0].name).toBe('Item 3')
    expect(foundItems[0].description).toBe('Description 3')
    expect(foundItems[0].quantity).toBe(2)
    expect(foundItems[0].warehouse).not.toBeNull()
  })
})

describe('Creates item', () => {
  it('Creates a new item', async () => {
    const itemInput = {
      name: 'Item',
      description: 'Description',
      quantity: 10,
      warehouse: 'Warehouse',
      image: '',
      tags: '',
    }
    const {
      data: { createItem },
    } = await client.mutate({ mutation: CREATE_ITEM, variables: { itemInput } })
    expect(createItem.name).toBe(itemInput.name)
    expect(createItem.description).toBe(itemInput.description)
    expect(createItem.quantity).toBe(itemInput.quantity)
    expect(createItem.warehouse).not.toBeNull()
  })
})

describe('Edits item', () => {
  it('Edits item', async () => {
    const itemInput = {
      name: 'Name',
      description: 'Description',
      quantity: 10,
      warehouse: '',
      image: '',
      tags: '',
    }
    const {
      data: { editItem: item },
    } = await client.mutate({
      mutation: EDIT_ITEM,
      variables: { itemId: items[0].id, itemInput },
    })
    expect(item.name).toBe(itemInput.name)
    expect(item.description).toBe(itemInput.description)
    expect(item.quantity).toBe(itemInput.quantity)
  })
})

describe('Assigns warehouse', () => {
  it('Assigns items to a warehouse', async () => {
    const itemIds = items.map((item) => item.id)
    await client.mutate({
      mutation: ASSIGN_WAREHOUSE,
      variables: { itemIds, warehouseName: warehouse.name },
    })
    const modifiedItems = await Item.find()
    for (const item of modifiedItems) {
      expect(item.warehouse).not.toBeNull()
    }
  })
})

describe('Deletes items', () => {
  it('Deletes selected items', async () => {
    const itemIds = items.map((item) => item.id)
    await client.mutate({ mutation: DELETE_ITEMS, variables: { itemIds } })
    const modifiedItems = await Item.find()
    expect(modifiedItems.length).toBe(0)
  })
})
