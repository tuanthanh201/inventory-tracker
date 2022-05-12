import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import defaultImage from '../../utils/getDefaultImage'
import getDate from '../../utils/getDate'
import { Button, Item, Label } from 'semantic-ui-react'
import { useContext, useEffect, useState } from 'react'
import SelectedItemsContext from '../../store/selectedItemsContext'

const InventoryItem = (props) => {
  const {
    id,
    name,
    warehouse,
    image,
    quantity,
    tags,
    createdAt,
    searchTerm,
    showSelectButton,
  } = props
  const itemsCtx = useContext(SelectedItemsContext)
  const [selected, setSelected] = useState(itemsCtx.items.includes(id))
  const imageSrc = image ?? defaultImage

  useEffect(() => {
    setSelected(itemsCtx.items.includes(id))
  }, [itemsCtx.items, id])

  const selectHandler = () => {
    if (selected) {
      itemsCtx.removeItem(id)
    } else {
      itemsCtx.selectItem(id)
    }
    setSelected((prev) => !prev)
  }

  let warehouseLink = 'N/A'
  if (warehouse) {
    const { name, id } = warehouse
    warehouseLink = <Link to={`/warehouses/${id}`}>{name}</Link>
  }
  return (
    <Item>
      <Item.Image src={imageSrc} as={Link} to={`/items/${id}`} />
      <Item.Content verticalAlign="top">
        {showSelectButton && (
          <Button
            floated="right"
            onClick={selectHandler}
            circular
            icon="check"
            positive={selected}
          />
        )}
        <Item.Header as={Link} to={`/items/${id}`}>
          <Highlighter
            searchWords={[searchTerm]}
            textToHighlight={name}
            autoEscape
          />
        </Item.Header>
        <Item.Meta>
          <p>Stored at: {warehouseLink}</p>
          <p>Quantity: {quantity}</p>
          <p>{getDate(createdAt)}</p>
        </Item.Meta>
        <Item.Extra>
          {tags.map((tag) => (
            <Label
              as={Link}
              to={`/items/tags/${tag.content}`}
              key={tag.id}
              id={tag.id}
              content={tag.content}
            />
          ))}
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default InventoryItem
