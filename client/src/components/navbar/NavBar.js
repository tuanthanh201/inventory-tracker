import { useQuery } from '@apollo/client'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import { GET_ALL_WAREHOUSES } from '../../graphql'
import AssignItem from './AssignItem'

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
            <Menu.Item
              style={{ cursor: 'pointer' }}
              name="Delete Items"
              onClick={() => console.log('delete items')}
            />
          </>
        )}
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
