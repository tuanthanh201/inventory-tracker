import { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Button, Input, Item } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { FIND_ITEM_BY_NAME, GET_ALL_ITEMS } from '../../graphql'
import InventoryItem from './InventoryItem'
import Spinner from '../spinner/Spinner'

const Items = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searched, setSearched] = useState(false)
  const [searching, setSearching] = useState(false)
  const {
    loading,
    data: allItems,
    fetchMore: fetchMoreAllItems,
  } = useQuery(GET_ALL_ITEMS)
  const [
    searchItems,
    { data: searchedItems, fetchMore: fetchMoreSearchedItems },
  ] = useLazyQuery(FIND_ITEM_BY_NAME)

  const searchHandler = async () => {
    setSearching(true)
    await searchItems({
      variables: { name: searchTerm },
    }).catch((e) => console.error(e))
    setSearching(false)
    setSearched(true)
  }

  const fetchMore = () => {
    if (!searched) {
      fetchMoreAllItems({ variables: { cursor: allItems?.findAllItems.last } })
    } else {
      fetchMoreSearchedItems({
        variables: {
          name: searchTerm,
          cursor: searchedItems.findItemsByName.last,
        },
      })
    }
  }

  let itemsContent = <Spinner />
  if (!(loading || searching)) {
    let items = []
    let hasMore = false
    if (!searched) {
      items = allItems?.findAllItems.items ? allItems?.findAllItems.items : []
      hasMore = allItems?.findAllItems.hasMore
    } else {
      items = searchedItems?.findItemsByName.items
        ? searchedItems?.findItemsByName.items
        : []
      hasMore = searchedItems?.findItemsByName.hasMore
    }
    itemsContent = (
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
              searchTerm={searchTerm}
              showSelectButton
            />
          ))}
        </Item.Group>
      </InfiniteScroll>
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
      {itemsContent}
    </>
  )
}

export default Items
