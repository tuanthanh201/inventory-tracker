import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Menu, Item } from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { FIND_ITEMS_BY_TAG } from '../../graphql'
import Spinner from '../spinner/Spinner'
import InventoryItem from './InventoryItem'

const TaggedItems = () => {
  const { tag } = useParams()
  const {
    loading,
    data,
    fetchMore: fetchMoreItems,
  } = useQuery(FIND_ITEMS_BY_TAG, {
    variables: { tag },
  })

  const fetchMore = () => {
    fetchMoreItems({
      variables: {
        tag,
        cursor: data.findItemsByTag.last,
      },
    })
  }

  let itemsContent = <Spinner />
  if (!loading) {
    const items = data.findItemsByTag.items
    const hasMore = data.findItemsByTag.hasMore
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
            />
          ))}
        </Item.Group>
      </InfiniteScroll>
    )
  }

  return (
    <>
      <Menu attached="top">
        <Menu.Item content={`Items tagged with "${tag}"`}></Menu.Item>
      </Menu>
      {itemsContent}
    </>
  )
}

export default TaggedItems
