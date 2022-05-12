import { Header, Image, Message, Segment } from 'semantic-ui-react'
import defaultImage from '../../utils/getDefaultImage'

const WarehouseContent = ({ warehouse }) => {
  const { name, description, location, image } = warehouse

  const imageSrc = image ?? defaultImage
  return (
    <Segment attached="bottom">
      <Header as="h1">{name}</Header>
      <div>
        <Header sub>Location: {location}</Header>
      </div>
      <Image
        style={{ width: '250px', marginBottom: '1rem' }}
        centered
        ui
        src={imageSrc}
      />
      <Message header="Description" content={description} />
    </Segment>
  )
}

export default WarehouseContent
