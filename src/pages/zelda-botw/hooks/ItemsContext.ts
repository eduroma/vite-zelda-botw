import React, { createContext } from 'react'

type ContextProps = {
  itemSelected: number
  setItemSelected: React.Dispatch<React.SetStateAction<number>>
}

const ItemsContext = createContext<Partial<ContextProps>>({})
export default ItemsContext
