import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import nProgress from 'nprogress'
import { Button, Menu } from 'semantic-ui-react'

import ConfirmModal from '../utils/ConfirmModal'
import FadeButton from '../utils/FadeButton'
import NotFound from '../utils/NotFound'
import Spinner from '../spinner/Spinner'
import EditItem from './EditItem'
import ItemContent from './ItemContent'
import { FIND_ITEM_BY_ID } from '../../graphql'

const SingleItem = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const { loading, data } = useQuery(FIND_ITEM_BY_ID, {
    variables: { itemId },
  })

  const toggleEditModeHandler = () => {
    setEditMode((prev) => !prev)
  }

  const cancelHandler = () => {
    setShowModal(false)
  }

  const confirmHandler = async () => {
    nProgress.start()
    console.log('delete item')
    nProgress.done()
    navigate('/')
  }

  if (loading) {
    return <Spinner />
  } else if (!data.item) {
    return <NotFound />
  }

  const item = data.item
  return (
    <>
      <ConfirmModal
        open={showModal}
        content="Are you sure you want to delete this item?"
        confirmButton={<Button negative>Delete</Button>}
        onCancel={cancelHandler}
        onConfirm={confirmHandler}
      />
      <Menu attached="top" tabular>
        <Menu.Item active={!editMode}>{`Stored at: ${
          item.warehouse?.name ?? 'N/A'
        }`}</Menu.Item>
        <Menu.Menu position="right">
          <FadeButton
            icon="edit"
            content="Edit"
            onClick={toggleEditModeHandler}
          />
          <FadeButton
            icon="trash"
            negative
            content="Delete"
            onClick={() => setShowModal(true)}
          />
        </Menu.Menu>
      </Menu>
      {!editMode && <ItemContent item={item} />}
      {editMode && (
        <EditItem
          editMode={editMode}
          item={item}
          onCancel={() => setEditMode(false)}
        />
      )}
    </>
  )
}

export default SingleItem
