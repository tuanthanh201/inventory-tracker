import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Menu } from 'semantic-ui-react'

import FadeButton from '../utils/FadeButton'
import NotFound from '../utils/NotFound'
import Spinner from '../spinner/Spinner'
import EditWarehouse from '../forms/EditWarehouse'
import WarehouseContent from './WarehouseContent'
import { FIND_WAREHOUSE_BY_ID } from '../../graphql'

const SingleWarehouse = () => {
  const { warehouseId } = useParams()
  const [editMode, setEditMode] = useState(false)
  const { loading, data } = useQuery(FIND_WAREHOUSE_BY_ID, {
    variables: { warehouseId },
  })

  const toggleEditModeHandler = () => {
    setEditMode((prev) => !prev)
  }

  if (loading) {
    return <Spinner />
  } else if (!data.warehouse) {
    return <NotFound />
  }

  const warehouse = data.warehouse
  return (
    <>
      <Menu attached="top" tabular>
        <Menu.Item active={!editMode}>{warehouse.name}</Menu.Item>
        <Menu.Menu position="right">
          <FadeButton
            icon="edit"
            content="Edit"
            onClick={toggleEditModeHandler}
          />
        </Menu.Menu>
      </Menu>
      {!editMode && <WarehouseContent warehouse={warehouse} />}
      {editMode && (
        <EditWarehouse
          editMode={editMode}
          warehouse={warehouse}
          onCancel={() => setEditMode(false)}
        />
      )}
    </>
  )
}

export default SingleWarehouse
