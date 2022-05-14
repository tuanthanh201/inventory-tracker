const { gql } = require('apollo-server')

const GET_ALL_ITEMS = gql`
  query ($cursor: ID) {
    findAllItems(cursor: $cursor) {
      hasMore
      last
      items {
        id
        name
        description
        image
        quantity
        tags {
          id
          content
        }
        warehouse {
          id
          name
        }
        createdAt
      }
    }
  }
`

const FIND_ITEMS_BY_NAME = gql`
  query ($name: String!, $cursor: ID) {
    findItemsByName(name: $name, cursor: $cursor) {
      hasMore
      last
      items {
        id
        name
        description
        image
        quantity
        tags {
          id
          content
        }
        warehouse {
          id
          name
        }
        createdAt
      }
    }
  }
`

const FIND_ITEM_BY_ID = gql`
  query ($itemId: ID!) {
    item: findItemById(itemId: $itemId) {
      id
      name
      id
      name
      description
      image
      quantity
      tags {
        id
        content
      }
      warehouse {
        id
        name
      }
    }
  }
`

const FIND_ITEMS_BY_TAG = gql`
  query ($tag: String!, $cursor: ID) {
    findItemsByTag(tag: $tag, cursor: $cursor) {
      hasMore
      last
      items {
        id
        name
        description
        image
        quantity
        tags {
          id
          content
        }
        warehouse {
          id
          name
        }
        createdAt
      }
    }
  }
`

const FIND_ITEMS_BY_WAREHOUSE = gql`
  query ($warehouseId: ID!, $cursor: ID) {
    findItemsByWarehouse(warehouseId: $warehouseId, cursor: $cursor) {
      hasMore
      last
      items {
        id
        name
        description
        image
        quantity
        tags {
          id
          content
        }
        warehouse {
          id
          name
        }
        createdAt
      }
    }
  }
`

const CREATE_ITEM = gql`
  mutation ($itemInput: ItemInput!) {
    createItem(itemInput: $itemInput) {
      id
      name
      description
      image
      quantity
      tags {
        id
        content
      }
      warehouse {
        name
      }
    }
  }
`

const EDIT_ITEM = gql`
  mutation ($itemId: ID!, $itemInput: ItemInput!) {
    editItem(itemId: $itemId, itemInput: $itemInput) {
      id
      name
      description
      image
      quantity
      tags {
        id
        content
      }
      warehouse {
        name
      }
    }
  }
`

const ASSIGN_WAREHOUSE = gql`
  mutation ($itemIds: [ID]!, $warehouseName: String!) {
    assignWarehouse(itemIds: $itemIds, warehouseName: $warehouseName)
  }
`

const DELETE_ITEMS = gql`
  mutation ($itemIds: [ID]!) {
    deleteItems(itemIds: $itemIds)
  }
`

module.exports = {
  GET_ALL_ITEMS,
  FIND_ITEMS_BY_NAME,
  FIND_ITEM_BY_ID,
  FIND_ITEMS_BY_TAG,
  FIND_ITEMS_BY_WAREHOUSE,
  CREATE_ITEM,
  EDIT_ITEM,
  ASSIGN_WAREHOUSE,
  DELETE_ITEMS,
}
