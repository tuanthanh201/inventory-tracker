import { useMutation } from '@apollo/client'
import alertify from 'alertifyjs'
import { useContext, useState } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import { DELETE_ITEMS, GET_ALL_ITEMS } from '../../graphql'
import SelectedItemsContext from '../../store/selectedItemsContext'
import ConfirmModal from '../utils/ConfirmModal'

const DeleteItem = (props) => {
  const { items, emptyItems } = useContext(SelectedItemsContext)
  const [showModal, setShowModal] = useState(false)
  const [deleteItems] = useMutation(DELETE_ITEMS)

  const clickHandler = () => {
    setShowModal(true)
  }

  const confirmHandler = async () => {
    try {
      await deleteItems({
        variables: { itemIds: items },
        refetchQueries: [{ query: GET_ALL_ITEMS }],
      })
      alertify.success(`Deleted ${items.length} item(s)`)
      emptyItems()
      setShowModal(false)
    } catch (error) {
      alertify.error(error.message)
    }
  }

  const cancelHandler = () => {
    setShowModal(false)
  }

  return (
    <>
      <ConfirmModal
        open={showModal}
        content={`Are you sure you want to delete the ${items.length} selected item(s)?`}
        confirmButton={<Button negative>Delete</Button>}
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
      />
      <Menu.Item
        style={{ cursor: 'pointer' }}
        name="Delete Items"
        onClick={clickHandler}
      />
    </>
  )
}

export default DeleteItem
