import { useMutation } from '@apollo/client'
import nProgress from 'nprogress'
import { useContext } from 'react'
import { Dropdown } from 'semantic-ui-react'
import alertify from 'alertifyjs'
import { ASSIGN_WAREHOUSE, GET_ALL_ITEMS } from '../../graphql'
import SelectedItemsContext from '../../store/selectedItemsContext'

const AssignItem = ({ warehouseName }) => {
  const { items, emptyItems } = useContext(SelectedItemsContext)
  const [assignToWarehouse] = useMutation(ASSIGN_WAREHOUSE, {
    variables: { itemIds: items, warehouseName },
    refetchQueries: [{ query: GET_ALL_ITEMS }],
  })

  const assignHandler = async () => {
    nProgress.start()
    try {
      await assignToWarehouse()
      alertify.success(`Assigned ${items.length} item(s) to ${warehouseName}`)
    } catch (error) {
      alertify.error(error.message)
    }
    emptyItems()
    nProgress.done()
  }

  return (
    <Dropdown.Item
      icon="warehouse"
      onClick={assignHandler}
      text={warehouseName}
    />
  )
}

export default AssignItem
