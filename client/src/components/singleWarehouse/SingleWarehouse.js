import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Item, Menu } from 'semantic-ui-react'

import FadeButton from '../utils/FadeButton'
import NotFound from '../utils/NotFound'
import Spinner from '../spinner/Spinner'
import EditWarehouse from '../forms/EditWarehouse'
import WarehouseContent from './WarehouseContent'
import { FIND_ITEMS_BY_WAREHOUSE, FIND_WAREHOUSE_BY_ID } from '../../graphql'
import InventoryItem from '../items/InventoryItem'
import InfiniteScroll from 'react-infinite-scroll-component'

const SingleWarehouse = () => {
  const { warehouseId } = useParams()
  const [editMode, setEditMode] = useState(false)
  const { loading: warehouseLoading, data: warehouseData } = useQuery(
    FIND_WAREHOUSE_BY_ID,
    { variables: { warehouseId } }
  )
  const {
    loading: itemsLoading,
    data: itemsData,
    fetchMore: fetchMoreItems,
  } = useQuery(FIND_ITEMS_BY_WAREHOUSE, { variables: { warehouseId } })

  const toggleEditModeHandler = () => {
    setEditMode((prev) => !prev)
  }

  const fetchMore = () => {
    fetchMoreItems({
      variables: { warehouseId, cursor: itemsData?.findItemsByWarehouse.last },
    })
  }

  if (warehouseLoading || itemsLoading) {
    return <Spinner />
  }

  if (!warehouseData.warehouse) {
    return <NotFound />
  }

  let assignedItems
  if (itemsData?.findItemsByWarehouse) {
    const { items, hasMore } = itemsData.findItemsByWarehouse
    assignedItems = (
      <InfiniteScroll
        dataLength={items.length}
        hasMore={hasMore}
        next={fetchMore}
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen all items</b>
          </p>
        }>
        <Item.Group divided style={{ paddingTop: '1rem' }}>
          {items.map((item) => (
            <InventoryItem
              id={item.id}
              key={item.id}
              name={item.name}
              description={item.description}
              warehouse={item.warehouse}
              image={item.image}
              quantity={item.quantity}
              tags={item.tags}
              createdAt={item.createdAt}
              showSelectButton={false}
            />
          ))}
        </Item.Group>
      </InfiniteScroll>
    )
  }

  const warehouse = warehouseData.warehouse
  return (
    <>
      <Menu attached="top" tabular>
        <Menu.Item active={!editMode}>{warehouse.name}</Menu.Item>
        <Menu.Menu position="right">
          <FadeButton
            icon="edit"
            content="Edit"
            onClick={toggleEditModeHandler}
          />
        </Menu.Menu>
      </Menu>
      {!editMode && <WarehouseContent warehouse={warehouse} />}
      {editMode && (
        <EditWarehouse
          setEditMode={setEditMode}
          editMode={editMode}
          warehouse={warehouse}
          onCancel={() => setEditMode(false)}
        />
      )}
      {assignedItems}
    </>
  )
}

export default SingleWarehouse
