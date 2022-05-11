import { Header, Image, Item, Label, Message, Segment } from 'semantic-ui-react'
import defaultImage from '../../utils/getDefaultImage'

const ItemContent = ({ item }) => {
  const { name, description, image, quantity, tags } = item

  const imageSrc = image ?? defaultImage
  return (
    <Segment attached="bottom">
      <Header as='h1'>{name}</Header>
      <div>
        <Header sub>Quantity: {quantity}</Header>
      </div>
      <Image
        style={{ width: '250px', marginBottom: '1rem' }}
        centered
        ui
        src={imageSrc}
      />
      <Item>
        <Item.Extra>
          {tags.map((tag) => (
            <Label key={tag.id} id={tag.id} content={tag.content} />
          ))}
        </Item.Extra>
      </Item>
      <Message header="Description" content={description} />
    </Segment>
  )
}

export default ItemContent
