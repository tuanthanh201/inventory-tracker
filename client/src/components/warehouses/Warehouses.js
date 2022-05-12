import { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Button, Input, Item } from 'semantic-ui-react'

import { GET_ALL_WAREHOUSES, FIND_WAREHOUSE_BY_NAME } from '../../graphql'
import Warehouse from './Warehouse'
import Spinner from '../spinner/Spinner'

const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searched, setSearched] = useState(false)
  const [searching, setSearching] = useState(false)
  const { loading, data: allWarehouses } = useQuery(GET_ALL_WAREHOUSES)
  const [searchWarehouses, { data: searchedWarehouses }] = useLazyQuery(
    FIND_WAREHOUSE_BY_NAME
  )

  const searchHandler = async () => {
    setSearching(true)
    await searchWarehouses({
      variables: { name: searchTerm },
    }).catch((e) => console.error(e))
    setSearching(false)
    setSearched(true)
  }

  let warehousesContent = <Spinner />
  if (!(loading || searching)) {
    let warehouses = []
    if (!searched) {
      warehouses = allWarehouses?.findAllWarehouses ?? []
    } else {
      warehouses = searchedWarehouses?.findWarehousesByName ?? []
    }
    warehousesContent = (
      <Item.Group divided>
        {warehouses.map((warehouse) => (
          <Warehouse
            id={warehouse.id}
            key={warehouse.id}
            name={warehouse.name}
            description={warehouse.description}
            location={warehouse.location}
            image={warehouse.image}
            createdAt={warehouse.createdAt}
            searchTerm={searchTerm}
          />
        ))}
      </Item.Group>
    )
  }

  const isLoading = loading || searching
  return (
    <>
      <Input
        fluid
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        action>
        <input />
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          content="Search"
          color="blue"
          onClick={searchHandler}
        />
      </Input>
      {warehousesContent}
    </>
  )
}

export default Warehouses
