import { Link } from 'react-router-dom'
import Highlighter from 'react-highlight-words'
import defaultImage from '../../utils/getDefaultImage'
import { Item } from 'semantic-ui-react'

const Warehouse = (props) => {
  const { id, name, location, description, image, searchTerm } = props
  const imageSrc = image ?? defaultImage

  return (
    <Item>
      <Item.Image src={imageSrc} as={Link} to={`/warehouses/${id}`} />

      <Item.Content verticalAlign="middle">
        <Item.Header as={Link} to={`/warehouses/${id}`}>
          <Highlighter
            searchWords={[searchTerm]}
            textToHighlight={name}
            autoEscape
          />
        </Item.Header>
        <Item.Meta>
          <p>{location}</p>
        </Item.Meta>
        <Item.Description>{description}</Item.Description>
      </Item.Content>
    </Item>
  )
}

export default Warehouse
