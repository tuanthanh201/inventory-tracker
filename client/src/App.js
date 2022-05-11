import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import './App.css'
import Items from './components/items/Items'
import NavBar from './components/utils/NavBar'
import Warehouses from './components/warehouses/Warehouses'
import SingleItem from './components/singleItem/SingleItem'

function App() {
  return (
    <Router>
      <Container>
        <NavBar />
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:itemId" element={<SingleItem />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Container>
    </Router>
  )
}

export default App
