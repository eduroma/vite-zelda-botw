import { createContext, Dispatch, SetStateAction } from 'react'
import { ItemType } from '../data/items.type'

type ContextProps = {
  itemSelected: number
  isModalOpened: boolean
  setItemSelected: Dispatch<SetStateAction<number>>
  setIsModalOpened: Dispatch<SetStateAction<boolean>>
  closeModal: () => void
  equipItem: () => void
  dropItem: () => void
  itemsEquipped: { [key: string]: ItemType }
}

const ItemsContext = createContext<Partial<ContextProps>>({})
export default ItemsContext
