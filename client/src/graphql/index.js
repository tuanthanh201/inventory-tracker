import { gql } from '@apollo/client'

//#region Queries
export const GET_ALL_ITEMS = gql`
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
          name
        }
        createdAt
      }
    }
  }
`

export const FIND_ITEM_BY_ID = gql`
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
        name
      }
    }
  }
`

export const FIND_ITEM_BY_NAME = gql`
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
          name
        }
        createdAt
      }
    }
  }
`

export const FIND_ITEM_BY_TAG = gql`
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
          name
        }
        createdAt
      }
    }
  }
`

export const FIND_ITEM_BY_WAREHOUSE = gql`
  query ($warehouseId: ID!) {
    findItemsByWarehouse(warehouseId: $warehouseId) {
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
          name
        }
        createdAt
      }
    }
  }
`

export const GET_ALL_TAGS = gql`
  query {
    findAllTags {
      id
      content
    }
  }
`

export const GET_ALL_WAREHOUSES = gql`
  query {
    findAllWarehouses {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

export const FIND_WAREHOUSE_BY_ID = gql`
  query ($warehouseId: ID!) {
    findWarehouseById(warehouseId: $warehouseId) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

export const FIND_WAREHOUSE_BY_NAME = gql`
  query ($name: String!) {
    findWarehousesByName(name: $name) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`
//#endregion

//#region  Mutations
export const CREATE_ITEM = gql`
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

export const EDIT_ITEM = gql`
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

export const ASSIGN_WAREHOUSE = gql`
  mutation ($itemIds: [ID]!, $warehouseName: String!) {
    assignWarehouse(itemIds: $itemIds, warehouseName: $warehouseName)
  }
`

export const DELETE_ITEMS = gql`
  mutation ($itemIds: [ID]!) {
    deleteItems(itemIds: $itemIds)
  }
`

export const CREATE_WAREHOUSE = gql`
  mutation ($warehouseInput: WarehouseInput!) {
    createWarehouse(warehouseInput: $warehouseInput) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

export const EDIT_WAREHOUSE = gql`
  mutation ($warehouseId: ID!, $warehouseInput: WarehouseInput!) {
    editWarehouse(warehouseId: $warehouseId, warehouseInput: $warehouseInput) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`
//#endregion
