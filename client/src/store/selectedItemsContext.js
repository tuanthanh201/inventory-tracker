import { createContext, useState } from 'react'

const SelectedItemsContext = createContext({
  items: [],
  selectItem: (itemId) => {},
  removeItem: (itemId) => {},
  emptyItems: () => {},
})

export const SelectedItemsContextProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const selectItem = (itemId) => {
    setItems((currentItems) => [...currentItems, itemId])
  }

  const removeItem = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item !== itemId))
  }

  const emptyItems = () => {
    setItems([])
  }

  const value = {
    items,
    selectItem,
    removeItem,
    emptyItems,
  }

  return (
    <SelectedItemsContext.Provider value={value}>
      {children}
    </SelectedItemsContext.Provider>
  )
}

export default SelectedItemsContext
