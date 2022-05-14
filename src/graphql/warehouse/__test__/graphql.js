const { gql } = require('apollo-server')

const GET_ALL_WAREHOUSES = gql`
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

const FIND_WAREHOUSE_BY_NAME = gql`
  query ($name: String!) {
    foundWarehouses: findWarehousesByName(name: $name) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

const FIND_WAREHOUSE_BY_ID = gql`
  query ($warehouseId: ID!) {
    warehouse: findWarehouseById(warehouseId: $warehouseId) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

const CREATE_WAREHOUSE = gql`
  mutation ($warehouseInput: WarehouseInput!) {
    warehouse: createWarehouse(warehouseInput: $warehouseInput) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

const EDIT_WAREHOUSE = gql`
  mutation ($warehouseId: ID!, $warehouseInput: WarehouseInput!) {
    warehouse: editWarehouse(
      warehouseId: $warehouseId
      warehouseInput: $warehouseInput
    ) {
      id
      name
      description
      location
      image
      createdAt
    }
  }
`

module.exports = {
  FIND_WAREHOUSE_BY_ID,
  FIND_WAREHOUSE_BY_NAME,
  GET_ALL_WAREHOUSES,
  CREATE_WAREHOUSE,
  EDIT_WAREHOUSE,
}
