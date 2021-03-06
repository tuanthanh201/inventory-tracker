import { useQuery } from '@apollo/client'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import { GET_ALL_WAREHOUSES } from '../../graphql'
import AssignItem from './AssignItem'
import DeleteItem from './DeleteItem'

const NavBar = () => {
  const { pathname } = useLocation()
  const { loading, data } = useQuery(GET_ALL_WAREHOUSES)

  return (
    <Menu size="massive" inverted>
      <Menu.Item as={Link} active={pathname === '/'} name="Inventory" to="/" />
      <Menu.Item
        as={Link}
        active={pathname === '/warehouses'}
        name="Warehouses"
        to="/warehouses"
      />
      <Menu.Menu position="right">
        {pathname !== '/add/item' && (
          <Menu.Item as={Link} to="/add/item" name="Add Item" />
        )}
        {pathname !== '/add/warehouse' && (
          <Menu.Item as={Link} to="/add/warehouse" name="Add Warehouse" />
        )}
        {pathname === '/' && (
          <>
            <Dropdown disabled={loading} item text="Assign Warehouse">
              <Dropdown.Menu>
                {data?.findAllWarehouses.map((warehouse) => (
                  <AssignItem
                    id={warehouse.id}
                    key={warehouse.id}
                    warehouseName={warehouse.name}
                  />
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <DeleteItem />
          </>
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
