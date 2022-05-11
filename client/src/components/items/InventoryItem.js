import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import defaultImage from '../../utils/getDefaultImage'
import getDate from '../../utils/getDate'
import { Item, Label } from 'semantic-ui-react'

const InventoryItem = (props) => {
  const { id, name, warehouse, image, quantity, tags, createdAt, searchTerm } =
    props
  const imageSrc = image ?? defaultImage

  let warehouseLink = 'N/A'
  if (warehouse) {
    const { name, id } = warehouse
    warehouseLink = <Link to={`/warehouse/${id}`}>{name}</Link>
  }
  return (
    <Item>
      <Item.Image src={imageSrc} as={Link} to={`/items/${id}`} />

      <Item.Content verticalAlign="top">
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
