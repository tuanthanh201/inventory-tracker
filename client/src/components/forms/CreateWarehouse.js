import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Form, Message, Segment } from 'semantic-ui-react'
import nProgress from 'nprogress'
import useInput from '../../hooks/useInput'
import { toBase64 } from '../../utils/imageToBase64'
import { CREATE_WAREHOUSE, GET_ALL_WAREHOUSES } from '../../graphql'
import alertify from 'alertifyjs'

const CreateWarehouse = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState()
  const {
    value: name,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useInput((name) => name.trim() !== '')
  const {
    value: description,
    valueIsValid: descriptionIsValid,
    valueIsInvalid: descriptionIsInvalid,
    valueChangeHandler: descriptionChangeHandler,
    valueBlurHandler: descriptionBlurHandler,
  } = useInput((description) => description.trim() !== '')
  const {
    value: location,
    valueIsValid: locationIsValid,
    valueIsInvalid: locationIsInvalid,
    valueChangeHandler: locationChangeHandler,
    valueBlurHandler: locationBlurHandler,
  } = useInput((location) => location.trim() !== '')
  const [createWarehouse, { loading, error }] = useMutation(CREATE_WAREHOUSE)

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
    try {
      await createWarehouse({
        variables: { warehouseInput },
        refetchQueries: [{ query: GET_ALL_WAREHOUSES }],
      })
      alertify.success('Created new warehouse')
      navigate('/warehouses')
    } catch (error) {
      console.error(error)
    }
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
    <Segment attached="bottom">
      <Form error={!!error}>
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
          label="Location"
          placeholder="Location...."
          value={location}
          onChange={locationChangeHandler}
          onBlur={locationBlurHandler}
          error={locationError}
        />
        <Form.Input
          onChange={(e) => setImage(e.target.files)}
          fluid
          label="Image"
          type="file"
        />
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
        <Message error>
          <Message.Header>Failed to create warehouse</Message.Header>
          <p>{error?.message}</p>
        </Message>
        <Form.Button
          fluid
          loading={loading}
          color="teal"
          type="submit"
          size="large"
          disabled={!formIsValid || loading}
          content="Create"
          onClick={submitHandler}
        />
      </Form>
    </Segment>
  )
}

export default CreateWarehouse
