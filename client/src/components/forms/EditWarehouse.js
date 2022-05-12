import { useMutation } from '@apollo/client'
import nProgress from 'nprogress'
import { useState } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { EDIT_WAREHOUSE } from '../../graphql'
import useInput from '../../hooks/useInput'
import { toBase64 } from '../../utils/imageToBase64'

const EditWarehouse = ({ warehouse, onCancel }) => {
  const [image, setImage] = useState()
  const [showImageField, setShowImageField] = useState(false)
  const {
    value: name,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((name) => name.trim() !== '', warehouse.name)
  const {
    value: description,
    valueIsValid: descriptionIsValid,
    valueIsInvalid: descriptionIsInvalid,
    valueChangeHandler: descriptionChangeHandler,
    valueBlurHandler: descriptionBlurHandler,
  } = useInput(
    (description) => description.trim() !== '',
    warehouse.description
  )
  const {
    value: location,
    valueIsValid: locationIsValid,
    valueIsInvalid: locationIsInvalid,
    valueChangeHandler: locationChangeHandler,
    valueBlurHandler: locationBlurHandler,
  } = useInput((location) => location.trim() !== '', warehouse.location)
  const [editWarehouse, { loading, data, error }] = useMutation(EDIT_WAREHOUSE)

  const submitHandler = async (e) => {
    e.preventDefault()
    nProgress.start()
    let imageBase64 = ''
    if (image) {
      imageBase64 = await toBase64(image[0])
    }
    const warehouseInput = {
      name,
      description,
      image: imageBase64,
      location,
    }
    await editWarehouse({
      variables: { warehouseId: warehouse.id, warehouseInput },
    }).catch((error) => console.error(error))
    nProgress.done()
  }

  const nameError = nameIsInvalid ? 'Name must not be empty' : undefined
  const descriptionError = descriptionIsInvalid
    ? 'Description must not be empty'
    : undefined
  const locationError = locationIsInvalid
    ? 'Location must not be empty'
    : undefined
  const formIsValid = nameIsValid && descriptionIsValid && locationIsValid
  return (
    <>
      <Segment attached="bottom">
        <Form success={!!data} error={!!error}>
          <Form.Input
            fluid
            required
            label="Name"
            placeholder="Name...."
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameError}
          />
          <Form.Input
            fluid
            required
            label="location"
            placeholder="location...."
            value={location}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            error={locationError}
          />
          <Form.Radio
            label="Replace Image"
            toggle
            checked={showImageField}
            onChange={() => setShowImageField((prev) => !prev)}></Form.Radio>
          {showImageField && (
            <Form.Input
              onChange={(e) => setImage(e.target.files)}
              fluid
              label="Image"
              type="file"
            />
          )}
          <Form.Input
            fluid
            required
            label="Description"
            placeholder="Description...."
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            error={descriptionError}
          />
          <Button.Group fluid style={{ marginTop: '1.5rem' }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button.Or />
            <Button
              loading={loading}
              positive
              disabled={!formIsValid}
              onClick={submitHandler}>
              Save
            </Button>
          </Button.Group>
          <Message
            success
            header="Edited warehouse"
            content="Warehouse has been successfully edited"
          />
          <Message
            error
            header="Failed to edit warehouse"
            content={error?.message}
          />
        </Form>
      </Segment>
    </>
  )
}

export default EditWarehouse
