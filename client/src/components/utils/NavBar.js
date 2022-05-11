import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const { pathname } = useLocation()

  return (
    <Menu size="massive" inverted>
      <Menu.Item as={Link} active={pathname === '/'} name="Inventory" to="/" />
      <Menu.Item
        as={Link}
        active={pathname === '/warehouses'}
        name="Warehouses"
        to="/warehouses"
      />
    </Menu>
  )
}

export default NavBar
