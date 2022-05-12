import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Form, Message, Segment } from 'semantic-ui-react'
import nProgress from 'nprogress'
import useInput from '../../hooks/useInput'
import useTags from '../../hooks/useTags'
import Spinner from '../spinner/Spinner'
import { toBase64 } from '../../utils/imageToBase64'
import { CREATE_ITEM, GET_ALL_ITEMS, GET_ALL_TAGS } from '../../graphql'
import useWarehouses from '../../hooks/useWarehouses'
import validateQuantity from '../../utils/validateQuantity'
import alertify from 'alertifyjs'

const CreateItem = (props) => {
  const navigate = useNavigate()
  const { loading: tagsLoading, tags } = useTags()
  const { loading: warehousesLoading, warehouses } = useWarehouses()
  const [searchOptions, setSearchOptions] = useState([])
  const [image, setImage] = useState()
  const [warehouse, setWarehouse] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
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
    value: quantity,
    valueIsValid: quantityIsValid,
    valueIsInvalid: quantityIsInvalid,
    valueChangeHandler: quantityChangeHandler,
    valueBlurHandler: quantityBlurHandler,
  } = useInput(validateQuantity)
  const [addItem, { loading, error }] = useMutation(CREATE_ITEM)

  useEffect(() => {
    if (tags) {
      setSearchOptions(tags)
    }
  }, [tags])

  const submitHandler = async (e) => {
    e.preventDefault()
    nProgress.start()
    let imageBase64 = ''
    if (image) {
      imageBase64 = await toBase64(image[0])
    }
    const formattedTags = selectedTags.reduce(
      (prev, current) => prev + ' ' + current,
      ''
    )
    const itemInput = {
      name,
      description,
      image: imageBase64,
      tags: formattedTags,
      quantity: parseInt(quantity),
      warehouse,
    }
    try {
      await addItem({
        variables: { itemInput },
        refetchQueries: [{ query: GET_ALL_ITEMS }, { query: GET_ALL_TAGS }],
      })
      alertify.success(`Added ${name} to inventory`)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
    nProgress.done()
  }

  if (tagsLoading || warehousesLoading) {
    return <Spinner />
  }

  const nameError = nameIsInvalid ? 'Name must not be empty' : undefined
  const descriptionError = descriptionIsInvalid
    ? 'Description must not be empty'
    : undefined
  const quantityError = quantityIsInvalid
    ? 'Quantity must be at least 0'
    : undefined
  const formIsValid = nameIsValid && descriptionIsValid && quantityIsValid
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
          label="Quantity"
          placeholder="Quantity...."
          value={quantity}
          onChange={quantityChangeHandler}
          onBlur={quantityBlurHandler}
          error={quantityError}
        />
        <Form.Input
          onChange={(e) => setImage(e.target.files)}
          fluid
          label="Image"
          type="file"
        />
        <Form.Dropdown
          fluid
          label="Warehouse"
          options={warehouses}
          search
          selection
          defaultValue={warehouse}
          placeholder={'Assign item to a warehouse'}
          onChange={(e, data) => setWarehouse(data.value)}
        />
        <Form.Dropdown
          fluid
          label="Tags"
          options={searchOptions}
          multiple
          search
          selection
          defaultValue={selectedTags}
          allowAdditions
          placeholder="Search for tags or create new ones..."
          onAddItem={(event, data) => {
            setSearchOptions((prev) => [
              ...prev,
              { key: data.value, text: data.value, value: data.value },
            ])
          }}
          onChange={(e, data) => {
            setSelectedTags(data.value)
          }}
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
          <Message.Header>Failed to add item</Message.Header>
          <p>{error?.message}</p>
        </Message>
        <Form.Button
          fluid
          loading={loading}
          color="teal"
          type="submit"
          size="large"
          disabled={!formIsValid || loading}
          content="Add"
          onClick={submitHandler}
        />
      </Form>
    </Segment>
  )
}

export default CreateItem
