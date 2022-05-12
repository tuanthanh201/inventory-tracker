import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Items from './components/items/Items'
import NavBar from './components/navbar/NavBar'
import Warehouses from './components/warehouses/Warehouses'
import SingleItem from './components/singleItem/SingleItem'
import CreateItem from './components/forms/CreateItem'
import { SelectedItemsContextProvider } from './store/selectedItemsContext'
import './App.css'
import 'alertifyjs/build/css/alertify.css'
import CreateWarehouse from './components/forms/CreateWarehouse'
import SingleWarehouse from './components/singleWarehouse/SingleWarehouse'

function App() {
  return (
    <Router>
      <SelectedItemsContextProvider>
        <Container>
          <NavBar />
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/add/item" element={<CreateItem />} />
            <Route path="/add/warehouse" element={<CreateWarehouse />} />
            <Route path="/items/:itemId" element={<SingleItem />} />
            <Route
              path="/warehouses/:warehouseId"
              element={<SingleWarehouse />}
            />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </Container>
      </SelectedItemsContextProvider>
    </Router>
  )
}

export default App
